package com.email.EmailServer.DatabaseModels;

import com.email.EmailServer.DatabaseModels.Email.Email;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@Entity
@Table(name = "attachments")
public class Attachment {

    @Id
    @Column(name = "attachment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="email_id", nullable = false)
    private Email email;

    @Column(name = "attachment_data", length = 512)
    private MultipartFile file;

    private Attachment(){

    }

    public Attachment(MultipartFile MultipartFile, Email Email){
        this.file = MultipartFile;
        this.email = Email;
        ServerSystem.AddAttachmentToDataBase(this);
    }
}
