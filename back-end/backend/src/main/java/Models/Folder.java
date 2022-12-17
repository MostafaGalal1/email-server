package Models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "folders")
public class Folder {

    @Id
    @Column(name = "folder_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer folderID;

    @ManyToOne
    @JoinColumn(name="owner_id", nullable = false)
    private User owner;

    @Column(name="folder_name")
    private String folderName;
    @OneToMany(mappedBy = "folder")
    private List<EmailHeader> headers = new ArrayList<EmailHeader>();

    public Integer getFolderID() {
        return folderID;
    }

    public void setFolderID(Integer folderID) {
        this.folderID = folderID;
    }
 
    public List<EmailHeader> getHeaders() {
        return headers;
    }

    public void setHeaders(List<EmailHeader> headers) {
        this.headers = headers;
    }

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
    public String getFolderName() {
        return folderName;
    }

    public void setFolderName(String folderName) {
        this.folderName = folderName;
    }
}
