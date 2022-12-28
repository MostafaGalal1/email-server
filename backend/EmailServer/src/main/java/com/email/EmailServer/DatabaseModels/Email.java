package com.email.EmailServer.DatabaseModels;

import com.email.EmailServer.DatabaseModels.UserPackage.User;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;

@Setter
@Getter
@Entity
public class Email{
    @Id
    @Column(name = "email_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "email_sender_handle", nullable = false)
    private String senderHandle;

    @Column(name = "email_receivers_handel")
    private ArrayList<String> receiversHandle = new ArrayList<>();

    @Column(name = "email_subject")
    private String subject;
    @Column(name = "email_content")
    private String content;

    @Column(name = "email_date")
    private Date dateOfEmail;

    @Column(name = "email_priority")
    private int priority;
    @Column(name = "email_content_set")
    private HashSet<String> contentSet;


    private void SetContentSet()
    {
        this.contentSet = new HashSet<>();

        String[] ContentWords = this.content.split(" ");

        for (String Word : ContentWords)
            contentSet.add(Word);
    }

    public boolean ContentHasWord(String Word)
    {
        return this.contentSet.contains(Word);
    }

    @Override
    public boolean equals(Object obj)
    {
        if (obj instanceof Email) return false;

        Email OtherEmail = (Email) obj;
        return (this.getId() == OtherEmail.getId());
    }
}
