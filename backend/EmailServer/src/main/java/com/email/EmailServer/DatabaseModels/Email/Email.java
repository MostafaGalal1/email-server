package com.email.EmailServer.DatabaseModels.Email;

import com.email.EmailServer.DatabaseModels.Attachment;
import com.email.EmailServer.DatabaseModels.ServerSystem;
import com.google.gson.Gson;
import jakarta.persistence.*;
import lombok.*;
import org.json.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
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


    private Email()
    {

    }

    public Email(JSONObject jsonObject)
    {
        this.buildEmail(jsonObject);
        this.SetContentSet();
    }

    private void buildEmail(JSONObject jsonObject)
    {
        this.senderAddress = jsonObject.getString("sender");
        this.receiversAddress = new Gson().fromJson(jsonObject.getJSONArray("receivers").toString(), List.class);
        this.subject = jsonObject.getString("subject");
        this.content = jsonObject.getString("body");
        this.dateOfEmail = new Date();
        this.priority = jsonObject.getInt("priority");
        ServerSystem.AddEmailToDatabase(this);
        this.CreateAttachments(jsonObject);
    }

    private void CreateAttachments(JSONObject jsonObject){
        List<MultipartFile> Files = new Gson().fromJson(jsonObject.getJSONArray("attachments").toString(), List.class);
        for (MultipartFile file: Files){
            JSONObject jsonData = this.ExtractData(file);
            Attachment attachment = new Attachment(jsonData,this);
            this.attachments.add(attachment);
        }
        ServerSystem.AddEmailToDatabase(this);
    }
    private JSONObject ExtractData(MultipartFile file){
       try {
           JSONObject jsonData = new JSONObject();
           jsonData.put("link",file.getBytes());
           jsonData.put("name",file.getOriginalFilename());
           jsonData.put("type",file.getContentType());
           return jsonData;
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
    }

    public void UpdateEmail(JSONObject jsonObject){
        this.buildEmail(jsonObject);
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
        List<JSONObject> Attachments = this.GetAttachments();
        jsonObject.put("attachments",Attachments);

        return jsonObject;
    }

    private List<JSONObject> GetAttachments(){
        List<JSONObject> Attachments = new ArrayList<>();
        for(Attachment attachment : this.attachments){
            JSONObject data = attachment.getFile();
            Attachments.add(data);
        }
        return Attachments;
    }

    public static Email getExistingEmailByID(long ID)
    {
        return ServerSystem.GetEmailByID(ID);
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
