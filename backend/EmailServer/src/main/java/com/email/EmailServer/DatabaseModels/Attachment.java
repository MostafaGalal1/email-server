package com.email.EmailServer.DatabaseModels;

import com.email.EmailServer.DatabaseModels.Email.Email;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "attachments")
public class Attachment {

    @Id
    @Column(name = "attachment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long attachmentID;

    @ManyToOne
    @JoinColumn(name="email_id", nullable = false)
    private Email email;

    @Column(name = "attachment_path", length = 512)
    private String path;


}
