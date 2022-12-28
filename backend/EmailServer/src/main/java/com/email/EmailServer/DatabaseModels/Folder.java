package com.email.EmailServer.DatabaseModels;


import com.email.EmailServer.DatabaseModels.SystemPackage.EmailIterator;
import com.email.EmailServer.DatabaseModels.UserPackage.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;

@Getter
@Setter
@Entity
@Table(name = "folders")
public class Folder{

    @Id
    @Column(name = "folder_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long folderId;
    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Column(name="folder_name")
    private String name;

    @Column(name="emails_id")
    private HashSet<Long> emailsId;

    @Column(name="type")
    private FolderType type;

    private Folder(){

    }
    public Folder(FolderType Type, String Name){
        this.name = Name;
        this.type = Type;
    }


    protected void SetName(String newName)
    {
        this.name = newName;
    }

    public boolean hasEmail(Long EmailId)
    {
        return this.emailsId.contains(EmailId);
    }

    public EmailIterator GetFolderEmailsIterator()
    {
        return new EmailIterator(this.emailsId);
    }

    public enum FolderType
    {
        primary,
        Secondary
    }
}
