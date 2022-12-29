package com.email.EmailServer.DatabaseModels.UserPackage;

import com.email.EmailServer.DatabaseModels.Email;
import com.email.EmailServer.DatabaseModels.Folder;
import com.email.EmailServer.DatabaseModels.SystemPackage.EmailIterator;
import com.email.EmailServer.Filter.AndCriteria;
import com.email.EmailServer.Filter.EmailCriteria;
import com.email.EmailServer.commands.ServerSystem;

import java.util.ArrayList;
import java.util.List;

public class UserFacade
{
    private User user;

    public UserFacade(User user)
    {
        this.user = user;
    }

    public void SaveEmailAsSender(long EmailID)
    {
        user.RemoveEmailFromAllFolders(EmailID);
        AddEmailToSent(EmailID);
    }
    public void SaveEmailAsReceiver(long EmailID)
    {
        AddEmailToInbox(EmailID);
    }

    public void SendEmailToTrash(Email email)
    {
        long EmailID = email.getEmailId();
        this.user.RemoveEmailFromAllFolders(EmailID);
        AddEmailToTrash(EmailID);
    }

    public boolean RestoreEmailFromTrash(Email email)
    {
        long EmailID = email.getEmailId();

        if (user.TrashHasEmail(EmailID) == false) return false;

        user.RemoveEmailFromAllFolders(EmailID);

        if (this.CheckUserAsEmailSender(email))
            AddEmailToSent(EmailID);
        else
            AddEmailToInbox(EmailID);

        return true;
    }

    private boolean CheckUserAsEmailSender(Email email)
    {
        String UserHandle = user.getAddress();

        return email.getSenderHandle().equals(UserHandle);
    }

    // Still need to implement sorting the Emails/////////////////////
    public List<Email> GetAllFolderEmailsWithFilterAndSort
            (String FolderName, List<EmailCriteria> AllCriteria)
    {
        List<Email> Emails = this.GetAllFolderEmails(FolderName);
        this.FilterEmailsForSearch(Emails, AllCriteria);
        return Emails;
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

    public boolean AddFolder(String folderName)
    {
        if (this.user.HasFolder(folderName)) return false;
        Folder folder = new Folder(Folder.FolderType.Secondary, folderName, this.user);
        this.user.AddFolder(folder);
//        ServerSystem.AddUserToDataBase(this.user);
        return true;
    }

    public void DeleteEmailPermanently(Email email)
    {
        long EmailID = email.getEmailId();
        this.user.RemoveEmailFromAllFolders(EmailID);
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

    public boolean RenameFolder(String oldName, String newName)
    {
        if (this.user.HasFolder(oldName) == false) return false;
        this.user.RenameFolder(oldName, newName);
        return true;
    }

    public boolean DeleteFolder(String FolderName)
    {
        if (this.user.HasFolder(FolderName) == false) return false;
        this.user.RemoveFolder(FolderName);
        return true;
    }


    private void AddEmailToInbox(long EmailID)
    {
        this.user.AddEmailToFolder(this.user.InboxName, EmailID);
    }
    private void AddEmailToSent(long EmailID)
    {
        this.user.AddEmailToFolder(this.user.SentName, EmailID);
    }
    private void AddEmailToDraft(long EmailID)
    {
        this.user.AddEmailToFolder(this.user.DraftName, EmailID);
    }
    private void AddEmailToTrash(long EmailID)
    {
        this.user.AddEmailToFolder(this.user.TrashName, EmailID);
    }
}
