package com.email.EmailServer.DatabaseModels.UserPackage;

import com.email.EmailServer.DatabaseModels.Email.Email;
import com.email.EmailServer.DatabaseModels.Folder;
import com.email.EmailServer.DatabaseModels.Email.EmailIterator;
import com.email.EmailServer.SearchingAndSorting.Filter.AndCriteria;
import com.email.EmailServer.SearchingAndSorting.Filter.EmailCriteria;
import com.email.EmailServer.DatabaseModels.ServerSystem;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class UserFacade
{
    private User user;

    public UserFacade(String UserAddress)
    {
        User user = ServerSystem.GetUserByAddress(UserAddress);
        this.user = user;
    }

    public void SendEmailToTrash(Email email)
    {
        long EmailID = email.getId();
        this.user.RemoveEmailFromAllFolders(EmailID);
        MoveEmailToTrash(EmailID);
    }

    public boolean RestoreEmailFromTrash(Email email)
    {
        long EmailID = email.getId();

        if (user.TrashHasEmail(EmailID) == false) return false;

        user.RemoveEmailFromAllFolders(EmailID);

        if (this.CheckUserAsEmailSender(email))
            MoveEmailToSent(EmailID);
        else
            MoveEmailToInbox(EmailID);

        return true;
    }

    private boolean CheckUserAsEmailSender(Email email)
    {
        String UserHandle = user.getAddress();

        return email.getSenderAddress().equals(UserHandle);
    }

    // Still need to implement sorting the Emails/////////////////////
    public List<JSONObject> GetAllFolderEmailsWithFilterAndSort
            (String FolderName, List<EmailCriteria> AllCriteria)
    {
        List<Email> Emails = this.GetAllFolderEmails(FolderName);
        this.FilterEmailsForSearch(Emails, AllCriteria);
        // sorting not implemented yet

        List<JSONObject> jsonList = this.ConvertEmailsToJsons(Emails);
        return jsonList;
    }

    private List<JSONObject> ConvertEmailsToJsons(List<Email> Emails)
    {
        List<JSONObject> jsonList = new ArrayList<>();
        Emails.forEach((email)->{
            JSONObject EmailJson = email.getJsonOfHeader();
            jsonList.add(EmailJson);
        });
        return jsonList;
    }

    private void FilterEmailsForSearch(List<Email> emails, List<EmailCriteria> AllCriteria)
    {
        AndCriteria andCriteria = new AndCriteria(AllCriteria);
        emails = andCriteria.MeetCriteria(emails);
    }

    private List<Email> GetAllFolderEmails(String FolderName)
    {
        List<Email> AllEmails = new ArrayList<>();
        EmailIterator iterator = this.user.GetFolderIterator(FolderName);

        while (iterator.hasNext())
        {
            Email email = iterator.next();
            AllEmails.add(email);
        }
        return AllEmails;
    }

    public void MoveEmailToFolder(String FolderName, long EmailID)
    {
        this.user.RemoveEmailFromAllFolders(EmailID);
        this.user.AddEmailToFolder(FolderName, EmailID);
    }

    public void SaveEmailToDraftRequest(JSONObject EmailJson)
    {
        long EmailID = this.CheckAndCreateExistingEmailAndReturnID(EmailJson);
        this.MoveEmailToDraft(EmailID);
    }

    public boolean SendEmailToSenderAndReceiversRequest(JSONObject EmailJson)
    {
        if (this.CheckSReceiverNotFoundInDatabase(EmailJson))
            return false;

        long EmailID = this.CheckAndCreateExistingEmailAndReturnID(EmailJson);

        this.SendEmailToSender(EmailJson, EmailID);
        this.SendEmailToReceivers(EmailJson, EmailID);

        return true;
    }

    private boolean CheckSReceiverNotFoundInDatabase(JSONObject EmailJson)
    {
        List<String> ReceiversHandle = (List<String>) EmailJson.get("receivers");
        for (String Receiver : ReceiversHandle)
        {
            if (this.CheckUserFoundInDataBase(Receiver) == false)
                return true;
        }
        return false;
    }

    private void SendEmailToSender(JSONObject EmailJson, long EmailID)
    {
        String SenderAddress = EmailJson.getString("sender");
        UserFacade SenderFacade = new UserFacade(SenderAddress);
        SenderFacade.SaveEmailAsSender(EmailID);
    }

    private void SendEmailToReceivers(JSONObject EmailJson, long EmailID)
    {
        List<String> ReceiverAddresses = (List<String>)EmailJson.get("receivers");

        ReceiverAddresses.forEach((address)->{
            UserFacade ReceiverFacade = new UserFacade(address);
            ReceiverFacade.SaveEmailAsReceiver(EmailID);
        });
    }

    private void SaveEmailAsSender(long EmailID)
    {
        user.RemoveEmailFromAllFolders(EmailID);
        MoveEmailToSent(EmailID);
    }

    private void SaveEmailAsReceiver(long EmailID)
    {
        MoveEmailToInbox(EmailID);
    }

    private long CheckAndCreateExistingEmailAndReturnID(JSONObject EmailJson)
    {
        long ID;
        if (this.CheckIsNewEmail(EmailJson))
        {
            Email email = new Email(EmailJson);
            ID = email.getId();
        }
        else
        {
            ID = this.ExtractIDFromEmailJson(EmailJson);
        }
        return ID;
    }

    private boolean CheckIsNewEmail(JSONObject EmailJson)
    {
        if (EmailJson.has("id"))
            return false;
        else
            return true;
    }

    public boolean AddFolder(String folderName)
    {
        if (this.user.HasFolder(folderName)) return false;
        Folder folder = new Folder(Folder.FolderType.Secondary, folderName, this.user);
        this.user.AddFolder(folder);
//        ServerSystem.AddUserToDataBase(this.user);
        return true;
    }

    public boolean DeleteFolder(String FolderName)
    {
        if (this.user.HasFolder(FolderName) == false) return false;
        this.user.RemoveFolder(FolderName);
        return true;
    }

    public boolean RenameFolder(String oldName, String newName)
    {
        if (this.user.HasFolder(oldName) == false) return false;
        if (this.user.HasFolder(newName) == true) return false;
        this.user.RenameFolder(oldName, newName);
        return true;
    }

    public List<String> GetAllFolderNames()
    {
        List<String> SecondaryFolderNames = this.user.GetAllSecondaryFolderNames();
        return SecondaryFolderNames;
    }

    public void DeleteEmailPermanently(Email email)
    {
        long EmailID = email.getId();
        this.user.RemoveEmailFromAllFolders(EmailID);
    }

    public void MoveEmailToDraft(Email email)
    {
        long EmailID = email.getId();
        this.MoveEmailToDraft(EmailID);
    }

    public static boolean CreateNewUser(String firstName, String lastName, String username, String password){
        if(ServerSystem.GetUserByAddress(username) != null) return false;
        new User(firstName, lastName, username, password);
        return true;
    }

    public static boolean ValidateUser(String username, String password){
        User user = ServerSystem.GetUserByAddress(username);
        if(user == null) return false;
        if(!user.getPassword().equals(password)) return false;
        return true;
    }


    private void MoveEmailToInbox(long EmailID)
    {
        this.MoveEmailToFolder(this.user.InboxName, EmailID);
    }
    private void MoveEmailToSent(long EmailID)
    {
        this.MoveEmailToFolder(this.user.SentName, EmailID);
    }
    private void MoveEmailToDraft(long EmailID)
    {
        this.MoveEmailToFolder(this.user.DraftName, EmailID);
    }
    private void MoveEmailToTrash(long EmailID)
    {
        this.MoveEmailToFolder(this.user.TrashName, EmailID);
    }

    private boolean CheckUserFoundInDataBase(String UserAdress)
    {
        User testUser = ServerSystem.GetUserByAddress(UserAdress);
        if (testUser == null)
            return false;
        else
            return true;
    }

    private long ExtractIDFromEmailJson(JSONObject jsonObject)
    {
        long ID = jsonObject.getLong("ID");
        return ID;
    }
}
