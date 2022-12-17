package Models;

import javax.persistence.*;

@Entity
@Table(name = "attachments")
public class Attachment {
    @Id
    @Column(name = "attachment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer attachmentID;

    @ManyToOne
    @JoinColumn(name="email_id", nullable = false)
    private Email email;

    @Column(name = "attachment_path", length = 512)
    private String path;

    public Integer getAttachmentID() {
        return attachmentID;
    }

    public void setAttachmentID(Integer attachmentID) {
        this.attachmentID = attachmentID;
    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}
