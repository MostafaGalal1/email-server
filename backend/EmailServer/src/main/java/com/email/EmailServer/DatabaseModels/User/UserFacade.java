package com.email.EmailServer.DatabaseModels.User;

import com.email.EmailServer.DatabaseModels.Email.Email;
import com.email.EmailServer.DatabaseModels.Folder;
import com.email.EmailServer.DatabaseModels.Email.EmailIterator;
import com.email.EmailServer.SearchingAndSorting.Filter.AndCriteria;
import com.email.EmailServer.SearchingAndSorting.Filter.EmailCriteria;
import com.email.EmailServer.DatabaseModels.ServerSystem;
import com.email.EmailServer.SearchingAndSorting.Filter.FiltersExtracter;
import com.email.EmailServer.SearchingAndSorting.SortingEmails;
import com.google.gson.Gson;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class UserFacade
{
    private User user;

    public UserFacade(String UserAddress)
    {
        User user = ServerSystem.GetUserByAddress(UserAddress);
        this.user = user;
    }

    public boolean SendEmailToTrash(long EmailID)
    {
        if (this.user.TrashHasEmail(EmailID))
            return false;

        this.user.RemoveEmailFromAllFolders(EmailID);
        MoveEmailToTrash(EmailID);
        return true;
    }

    public boolean RestoreEmailFromTrash(long EmailID)
    {
        if (user.TrashHasEmail(EmailID) == false)
            return false;

        user.RemoveEmailFromAllFolders(EmailID);
        this.RestoreEmailToInboxOrSent(EmailID);

        return true;
    }

    private void RestoreEmailToInboxOrSent(long EmailID)
    {
        Email email = Email.getExistingEmailByID(EmailID);
        if (this.CheckUserAsEmailSender(email))
            this.MoveEmailToSent(EmailID);
        else
            this.MoveEmailToInbox(EmailID);
    }

    private boolean CheckUserAsEmailSender(Email email)
    {
        String UserHandle = user.getAddress();

        return email.getSenderAddress().equals(UserHandle);
    }

    public List<JSONObject> SearchFoldersRequest(String FolderName, JSONObject RequestJson, String SortOption)
    {
        EmailCriteria filterCriteria = FiltersExtracter.ExtractAllFilters(RequestJson);
        return this.SearchAndSortEmails(FolderName, filterCriteria, SortOption);
    }

    public List<JSONObject> GetFolderEmailsRequest(String FolderName, String SortOption)
    {
        this.CheckFolderIsTrashAndRemove30DaysEmails(FolderName);

        AndCriteria andCriteria = new AndCriteria(new ArrayList<>());
        return this.SearchAndSortEmails(FolderName, andCriteria, SortOption);
    }

    private List<JSONObject> SearchAndSortEmails(String FolderName, EmailCriteria filterCriteria, String SortOption)
    {
        List<Email> Emails = this.GetAllFolderEmails(FolderName);

        Emails = this.FilterEmailsForSearch(Emails, filterCriteria);

        Emails = SortingEmails.SortEmails(Emails, SortOption);

        List<JSONObject> jsonList = this.ConvertEmailsToJsons(Emails);
        return jsonList;
    }

    private void CheckFolderIsTrashAndRemove30DaysEmails(String FolderName)
    {
        if (this.IsTrash(FolderName) == false)
            return;
        this.RemoveAllPast30EmailsInTrash();
    }

    private void RemoveAllPast30EmailsInTrash()
    {
        EmailIterator iterator = this.GetTrashIterator();
        while (iterator.hasNext())
        {
            Email email = iterator.next();
            if (this.Check30DayRemovalForOneEmail(email));
            this.user.RemoveEmailFromAllFolders(email.getId());
        }
    }

    private boolean Check30DayRemovalForOneEmail(Email email)
    {
        Date date1 = email.getDateOfEmail();
        Date date2 = new Date();

        long time_difference = date2.getTime() - date1.getTime();
        long days_difference = time_difference / (1000*60*60*24);

        if (days_difference >= 30)
            return true;
        else
            return false;
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

    private List<Email> FilterEmailsForSearch(List<Email> emails, EmailCriteria criteria)
    {
        emails = criteria.MeetCriteria(emails);
        return emails;
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

    public boolean MoveEmailToFolderRequest(String FolderName, long EmailID)
    {
        this.MoveEmailToFolder(FolderName, EmailID);
        return true;
    }

    private void MoveEmailToFolder(String FolderName, long EmailID)
    {
        this.user.RemoveEmailFromAllFolders(EmailID);
        this.user.AddEmailToFolder(FolderName, EmailID);
    }

    public boolean SendEmailToDraftRequest(JSONObject EmailJson)
    {
        if (this.CheckSReceiverNotFoundInDatabase(EmailJson))
            return false;

        long EmailID = this.CheckAndCreateExistingEmailAndReturnID(EmailJson);
        this.MoveEmailToDraft(EmailID);

        return true;
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
        List<String> ReceiversHandle = new Gson().fromJson(EmailJson.getJSONArray("receivers").toString(), List.class);
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
        List<String> ReceiverAddresses = new Gson().fromJson(EmailJson.getJSONArray("receivers").toString(), List.class);

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
            Email email = Email.getExistingEmailByID(ID);
            email.UpdateEmail(EmailJson);
        }
        return ID;
    }

    private boolean CheckIsNewEmail(JSONObject EmailJson)
    {
        if (EmailJson.getLong("id") != -1)
            return false;
        else
            return true;
    }

    public boolean AddFolder(String folderName)
    {
        if (this.user.HasFolder(folderName)) return false;
        Folder folder = new Folder(Folder.FolderType.Secondary, folderName, this.user);
        this.user.AddFolder(folder);
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

    public boolean DeleteEmailPermanently(long EmailID)
    {
        if (this.user.TrashHasEmail(EmailID) == false)
            return false;
        this.user.RemoveEmailFromAllFolders(EmailID);
        return true;
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

    public boolean AddContact(String contactName, List<String> Addresses)
    {
        if (this.user.HasContact(contactName)) return false;
        Contact contact = new Contact(contactName, Addresses, this.user);
        this.user.AddContact(contact);
        return true;
    }

    public boolean DeleteContact(String ContactName)
    {
        if (this.user.HasContact(ContactName) == false) return false;
        this.user.RemoveContact(ContactName);
        return true;
    }

    public boolean EditeContact(String oldName, String newName, List<String> Addresses)
    {
        if (this.user.HasContact(oldName) == false) return false;
        if (this.user.HasContact(newName) == true) return false;
        this.user.EditContact(oldName, newName, Addresses);
        return true;
    }

    public List<JSONObject> GetAllContacts()
    {
        List<JSONObject> contactNames = this.user.GetAllContactsJson();
        return contactNames;
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
        long ID = jsonObject.getLong("id");
        return ID;
    }

    private EmailIterator GetTrashIterator()
    {
        EmailIterator iterator = this.user.GetFolderIterator(this.user.TrashName);
        return iterator;
    }

    private boolean IsTrash(String FolderName)
    {
        if (FolderName.equals(this.user.TrashName))
            return true;
        else
            return false;
    }
}
