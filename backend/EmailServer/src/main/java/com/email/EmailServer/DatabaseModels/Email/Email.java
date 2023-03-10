package com.email.EmailServer.DatabaseModels.Email;

import com.email.EmailServer.DatabaseModels.Attachment;
import com.email.EmailServer.DatabaseModels.DatabaseDriver;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import jakarta.persistence.*;
import lombok.*;
import org.json.JSONArray;
import org.json.JSONObject;

import java.util.*;

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

    @Column(name = "email_receivers_address" , length = 100000)
    private List<String> receiversAddress = new ArrayList<>();

    @Column(name = "email_subject")
    private String subject;
    @Column(name = "email_content" , length = 100000)
    private String content;

    @Column(name = "email_date")
    private Date dateOfEmail;

    @Column(name = "email_priority")
    private int priority;
    @Column(name = "email_content_set" , length = 100000)
    private HashSet<String> contentSet;

    @OneToMany(mappedBy = "email")
    private List<Attachment> attachments = new ArrayList<Attachment>();


    public Email()
    {

    }

    public Email(JSONObject jsonObject)
    {
        this.buildEmail(jsonObject);
        this.SetContentSet();

        DatabaseDriver.AddEmailToDatabase(this);
    }

    private void buildEmail(JSONObject jsonObject)
    {
        this.senderAddress = jsonObject.getString("sender");
        this.receiversAddress = new Gson().fromJson(jsonObject.getJSONArray("receivers").toString(), List.class);
        this.subject = jsonObject.getString("subject");
        this.content = jsonObject.getString("body");
        this.dateOfEmail = new Date();
        this.priority = jsonObject.getInt("priority");
        DatabaseDriver.AddEmailToDatabase(this);
        System.out.println(jsonObject);
        JSONArray Files = jsonObject.getJSONArray("attachments");
        this.attachments = this.CreateAttachments(Files);
    }

    public void UpdateEmail(JSONObject jsonObject){
        this.buildEmail(jsonObject);
        this.SetContentSet();
        DatabaseDriver.AddEmailToDatabase(this);
    }

    public JSONObject getJsonOfHeader()
    {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("id", this.id);
        jsonObject.put("sender", this.senderAddress);
        jsonObject.put("receivers", this.receiversAddress);
        jsonObject.put("subject",this.subject);
        jsonObject.put("body", this.content);
        jsonObject.put("date", this.dateOfEmail.toInstant());

        return jsonObject;
    }

    private List<Attachment> CreateAttachments(JSONArray Files){
        List<Attachment> Attachments = new ArrayList<>();
        for(int index = 0; index < Files.length(); index++){
            Attachment attachment = new Attachment(Files.getJSONObject(index), this);
            Attachments.add(attachment);
        }
        return Attachments;
    }

    public static Email getExistingEmailByID(long ID)
    {
        return DatabaseDriver.GetEmailByID(ID);
    }

   public List<JSONObject> GetJsonAttachments(){
        List<JSONObject> Attachments = new ArrayList<>();
        for (Attachment attachment : this.attachments){
            JSONObject jsonObject = attachment.getFile();
            Attachments.add(jsonObject);
        }
        return Attachments;
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

    public boolean HashAttachment()
    {
        return (this.attachments.size() > 0);
    }
}