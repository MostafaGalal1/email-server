package Models.Immutables;

import Models.Attachment;
import Models.Email;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class EmailImmutable {

    private Integer emailID;
    private String title;
    private String senderAddress;
    private String senderName;
    private String content;
    private java.util.Date date;
    private List<Map<String, Object>> attachments = new ArrayList<Map<String, Object>>();
    private Integer priority;

    public EmailImmutable(Email email) {
        this.emailID = email.getEmailID();
        this.title = email.getTitle();
        this.senderAddress = email.getSender().getAddress();
        this.senderName = email.getSender().getUserName();
        this.content = email.getContent();
        this.date = email.getDate();
        this.priority = email.getPriority();

        List<Attachment> attachList = email.getAttachments();
        for (Attachment attachment: attachList) {
            Map<String, Object> attachmentPackage = new HashMap<String, Object>();
            try {
                attachmentPackage.put("fileName", attachment.getPath().substring(43));
                attachmentPackage.put("content", Files.readAllBytes(Paths.get(attachment.getPath())));
                this.attachments.add(attachmentPackage);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public Integer getEmailID() {
        return emailID;
    }

    public String getTitle() {
        return title;
    }

    public String getSenderAddress() {
        return senderAddress;
    }

    public String getSenderName() {
        return senderName;
    }

    public String getContent() {
        return content;
    }

    public Date getDate() {
        return date;
    }

    public List<Map<String, Object>> getAttachments() {
        return attachments;
    }

    public Integer getPriority() {
        return priority;
    }
}
