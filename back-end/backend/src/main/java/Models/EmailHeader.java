package Models;

import Interfaces.IUserRO;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "email_headers")
public class EmailHeader {

    @Id
    @Column(name = "email_header_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer emailHeaderID;

    @Column(name = "email_title")
    private String title;

    @ManyToOne
    @JoinColumn(name="email_id", nullable = false)
    private Email email;

    @ManyToOne
    @JoinColumn(name="sender_id", nullable = false)
    private User sender;

    @Column(name = "email_date")
    private java.util.Date date;

    @Column(name = "email_priority")
    private Integer priority;

    @ManyToOne
    @JoinColumn(name= "folder_id", nullable = false)
    private Folder folder;

    public Integer getEmailHeaderID() {
        return emailHeaderID;
    }

    public void setEmailHeaderID(Integer emailHeaderID) {
        this.emailHeaderID = emailHeaderID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Email getEmail() {
        return email;
    }

    public void setEmail(Email email) {
        this.email = email;
    }

    public IUserRO getSender() {
        return (IUserRO) sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getPriority() {
        return priority;
    }

    public void setPriority(Integer priority) {
        this.priority = priority;
    }

    public Folder getFolder() {
        return folder;
    }

    public void setFolder(Folder folder) {
        this.folder = folder;
    }
}
