package com.email.EmailServer.DatabaseModels;


import com.email.EmailServer.DatabaseModels.SystemPackage.EmailIterator;
import com.email.EmailServer.DatabaseModels.UserPackage.User;
import com.email.EmailServer.commands.ServerSystem;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@DynamicUpdate
@Table(name = "folders")
public class Folder{

    @Id
    @Column(name = "folder_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long folderId;

    @ManyToOne
    @Setter(AccessLevel.NONE)
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Column(name="folder_name")
    private String name;

    @Column(name="emails_id")
    private HashSet<Long> emailsId;

    @Column(name="type")
    private FolderType type;

    private Folder()
    {

    }
    public Folder(FolderType Type, String Name, User user){
        this.name = Name;
        this.type = Type;
        this.user = user;
        ServerSystem.AddFolderToDataBase(this);
    }

    public void DestroyFolder() // removes from database
    {
        ServerSystem.RemoveFolderFromDataBase(this);
    }

    public boolean HasEmail(Long EmailID)
    {
        return this.emailsId.contains(EmailID);
    }

    public void AddEmail(long EmailID)
    {
        this.emailsId.add(EmailID);
        ServerSystem.AddFolderToDataBase(this);
    }

    public boolean RemoveEmail(long EmailID)
    {
        if (this.HasEmail(EmailID) == false)
            return false;

        this.emailsId.remove(EmailID);
        ServerSystem.AddFolderToDataBase(this);
        return true;
    }

    public EmailIterator GetIterator()
    {
        return new EmailIterator(this.emailsId);
    }

    public enum FolderType
    {
        primary,
        Secondary
    }
}
