package com.email.EmailServer.DatabaseModels.Email;

import com.email.EmailServer.DatabaseModels.Attachment;
import com.email.EmailServer.DatabaseModels.ServerSystem;
import jakarta.persistence.*;
import lombok.*;
import org.json.JSONObject;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

@Setter
@Getter
@Entity
@Table(name = "emails")
public class Email{
    @Id
    @Column(name = "email_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "email_sender_address", nullable = false)
    private String senderAddress;

    @Column(name = "email_receivers_address")
    private List<String> receiversAddress = new ArrayList<>();

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

    @OneToMany(mappedBy = "email")
    private List<Attachment> attachments = new ArrayList<Attachment>();


    public Email()
    {

    }

    public Email(JSONObject jsonObject)
    {
        ServerSystem.AddEmailToDatabase(this);

        this.buildEmail(jsonObject);

        ServerSystem.AddEmailToDatabase(this);
    }

    private void buildEmail(JSONObject jsonObject)
    {
        this.senderAddress = jsonObject.getString("sender");
        this.receiversAddress = (List<String>) jsonObject.get("receivers");
        this.subject = jsonObject.getString("subject");
        this.content = jsonObject.getString("body");
        this.dateOfEmail = new Date();
        this.priority = jsonObject.getInt("priority");
        ////////////////////// attachment//////////////////////////////////
    }


    public JSONObject getJsonOfHeader()
    {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("id", this.id);
        jsonObject.put("sender", this.senderAddress);
        jsonObject.put("receivers", this.receiversAddress);
        jsonObject.put("subject",this.subject);
        jsonObject.put("body", this.content);
        jsonObject.put("date", this.dateOfEmail);////////////// needs linking with frontend way of storage
        return jsonObject;
    }

    public static Email getExistingEmailByID(long ID)
    {
        return ServerSystem.GetEmailByID(ID);
    }


    /////////////////////////////////////////////////////////////
    public void getJsonOfEmail() //Needs adding attachment to json ///////////////////////////////////////////////////
    {
        JSONObject jsonObject = this.getJsonOfHeader();

        jsonObject.put("content", this.getContent());
        // goda haiekteb el attachment
    }

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