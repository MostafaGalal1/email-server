package Models;

import Interfaces.IUserRO;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "users")
public class User implements IUserRO {


    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @Column(name = "user_name" , length = 128)
    private String userName;

    @Column(name = "user_address", length = 128, nullable = false)
    private String address;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_Dob")
    private java.util.Date DOB;

    @OneToMany(mappedBy = "owner")
    private List<Folder> folders = new ArrayList<Folder>() ;

    @OneToMany(mappedBy = "owner")
    private List<Contact> contacts = new ArrayList<Contact>();

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Date getDOB() {
        return DOB;
    }

    public void setDOB(Date DOB) {
        this.DOB = DOB;
    }

    public List<Folder> getFolders() {
        return folders;
    }

    public void setFolders(List<Folder> folders) {
        this.folders = folders;
    }

    public List<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(List<Contact> contacts) {
        this.contacts = contacts;
    }
}