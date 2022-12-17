package Models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "emails")
public class Email {

    @Id
    @Column(name = "email_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer emailID;

    @Column(name = "email_title")
    private String title;

    @ManyToOne
    @JoinColumn(name="sender_id", nullable = false)
    private User sender;

    @Column(name = "email_content", columnDefinition="TEXT")
    private String content;

    @Column(name = "email_date")
    private java.util.Date date;

    @OneToMany(mappedBy = "email")
    private List<Attachment> attachments = new ArrayList<Attachment>();

    @Column(name = "email_priority")
    private Integer priority;

    public Integer getEmailID() {
        return emailID;
    }

    public void setEmailID(Integer emailID) {
        this.emailID = emailID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public List<Attachment> getAttachments() {
        return attachments;
    }

    public void setAttachments(List<Attachment> attachments) {
        this.attachments = attachments;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }
}
