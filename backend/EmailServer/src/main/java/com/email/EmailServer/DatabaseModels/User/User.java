package com.email.EmailServer.DatabaseModels.User;


import com.email.EmailServer.DatabaseModels.Folder;
import com.email.EmailServer.DatabaseModels.Email.EmailIterator;
import com.email.EmailServer.DatabaseModels.ServerSystem;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.json.JSONObject;

import java.util.*;

@Getter
@Setter
@Entity
@DynamicUpdate
@Table(name = "users")
public class User
{
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "user_firstName" , length = 128)
    private String firstName;

    @Column(name = "user_lastName" , length = 128)
    private String lastName;

    @Column(name = "user_address", length = 128)
    private String address;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_Date")
    private Date date;

    @OneToMany(mappedBy = "user")
    private Map<String, Contact> contacts = new HashMap<>();

    @OneToMany(mappedBy = "user")
    private Map<String, Folder> folders = new HashMap<>();



    final String InboxName = "Inbox";
    final String SentName = "Sent";
    final String DraftName = "Draft";
    final String TrashName = "Trash";

    private User()
    {

    }
    public User(String FirstName, String LastName, String UserName, String Password)
    {
        ServerSystem.AddUserToDataBase(this);
        this.firstName = FirstName;
        this.lastName = LastName;
        this.address = UserName;
        this.password = Password;
        this.date = new Date();

        ServerSystem.AddUserToDataBase(this);
        this.InitializeFolders();

        //ServerSystem.AddUserToDataBase(this);
    }

    private void InitializeFolders()
    {
        Folder Inbox = new Folder(Folder.FolderType.primary, "Inbox", this);
        Folder Sent = new Folder(Folder.FolderType.primary, "Sent", this);
        Folder Draft = new Folder(Folder.FolderType.primary, "Draft", this);
        Folder Trash = new Folder(Folder.FolderType.primary, "Trash", this);

        //this.folders = new HashMap<>();

        this.AddFolder(Inbox);
        this.AddFolder(Sent);
        this.AddFolder(Draft);
        this.AddFolder(Trash);
    }

    protected void AddFolder(Folder folder)
    {
        this.folders.put(folder.getName(), folder);
        ServerSystem.AddUserToDataBase(this);
    }

    protected void RemoveFolder(String FolderName)
    {
        Folder folder = this.getFolderByName(FolderName);
        this.RemoveFolderFromHashMap(FolderName);
        folder.DestroyFolder();
    }

    private void RemoveFolderFromHashMap(String FolderName)
    {
        this.folders.remove(FolderName);
        ServerSystem.AddUserToDataBase(this);
    }

    protected void RenameFolder(String oldName, String newName)
    {
        Folder folder = this.getFolderByName(oldName);
        this.RemoveFolderFromHashMap(oldName);
        folder.setName(newName);

        this.AddFolder(folder);
    }

    protected List<String> GetAllSecondaryFolderNames()
    {
        List<String> SecondaryFolderNames = new ArrayList<>();
        this.folders.forEach((key, value)->{
            if (!value.isPrimary())
                SecondaryFolderNames.add(value.getName());
        });
        return SecondaryFolderNames;
    }

    protected boolean HasFolder(String FolderName)
    {
        return this.folders.containsKey(FolderName);
    }

    protected boolean HasFolderSecondary(String FolderName)
    {
        if (this.folders.containsKey(FolderName) == false)
            return false;
        Folder folder = this.folders.get(FolderName);
        if (folder.isPrimary()) return false;
        return true;
    }


    protected void RemoveEmailFromAllFolders(long EmailID)
    {
        this.folders.forEach((folderName, folder) ->
        {
            if (folderName.equals(this.TrashName)) return;

            if (folder.HasEmail(EmailID))
                folder.RemoveEmail(EmailID);
        });
    }

    protected EmailIterator GetFolderIterator(String FolderName)
    {
        Folder folder = this.getFolderByName(FolderName);
        EmailIterator iterator = folder.GetIterator();
        return iterator;
    }

    protected void AddEmailToFolder(String FolderName, long EmailID)
    {
        Folder folder = this.getFolderByName(FolderName);
        folder.AddEmail(EmailID);
    }

    protected boolean TrashHasEmail(long EmailID)
    {
        return this.FolderHasEmail(this.TrashName, EmailID);
    }

    protected boolean FolderHasEmail(String FolderName, long EmailID)
    {
        Folder folder = this.getFolderByName(FolderName);
        return folder.HasEmail(EmailID);
    }

    protected void AddContact(Contact contact){
        this.contacts.put(contact.getName(),contact);
        ServerSystem.AddUserToDataBase(this);
    }

    protected void EditContact(String oldName, String newName, List<String> Addresses)
    {
        Contact contact = this.getContactByName(oldName);
        this.RemoveContactFromHashMap(oldName);
        contact.EditContact(newName, Addresses);
        this.AddContact(contact);
    }

    protected void RemoveContact(String ContactName)
    {
        Contact contact = this.getContactByName(ContactName);
        this.RemoveContactFromHashMap(ContactName);
        contact.DestroyContact();
    }

    private void RemoveContactFromHashMap(String ContactName)
    {
        this.contacts.remove(ContactName);
        ServerSystem.AddUserToDataBase(this);
    }
    protected List<JSONObject> GetAllContactsJson(){
        Set<String> names = this.contacts.keySet();
        List<JSONObject> contactJsons = new ArrayList<>();
        for(String contactName : names ) {
            JSONObject contactJson = this.GetContactJson(contactName);
            contactJsons.add(contactJson);
        }
        return contactJsons;
    }

    private JSONObject GetContactJson(String ContactName){
        Contact contact = this.contacts.get(ContactName);
        JSONObject contactJson = contact.getJsonOfContact();
        return contactJson;
    }

    protected boolean HasContact(String ContactName)
    {
        return this.contacts.containsKey(ContactName);
    }

    private Contact getContactByName(String ContactName)
    {
        return this.contacts.get(ContactName);
    }
    private Folder getFolderByName(String FolderName)
    {
        return this.folders.get(FolderName);
    }

    @Override
    public boolean equals(Object obj)
    {
        if (obj instanceof User) return false;

        User OtherUser = (User) obj;
        return (this.getAddress() == OtherUser.getAddress());
    }
}








