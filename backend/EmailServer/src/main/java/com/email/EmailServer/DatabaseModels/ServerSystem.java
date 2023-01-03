package com.email.EmailServer.DatabaseModels;

import com.email.EmailServer.DatabaseModels.Email.Email;
import com.email.EmailServer.DatabaseModels.Repos.*;
import com.email.EmailServer.DatabaseModels.User.Contact;
import com.email.EmailServer.DatabaseModels.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ServerSystem{

    @Autowired
    private static UserRepo userRepo;
    @Autowired
    private static FolderRepo folderRepo;
    @Autowired
    private static EmailRepo emailRepo;
    @Autowired
    private static ContactRepo contactRepo;
    @Autowired
    private static AttachmentRepo attachmentRepo;

    public ServerSystem(UserRepo UserRepo, FolderRepo FolderRepo, EmailRepo EmailRepo, ContactRepo ContactRepo, AttachmentRepo AttachmentRepo)
    {
        userRepo = UserRepo;
        folderRepo = FolderRepo;
        emailRepo = EmailRepo;
        contactRepo = ContactRepo;
        attachmentRepo = AttachmentRepo;
    }

    public static void AddFolderToDataBase(Folder folder)
    {
        folderRepo.save(folder);
    }

    public static void RemoveFolderFromDataBase(Folder folder)
    {
        folderRepo.delete(folder);
    }

    public static void AddEmailToDatabase(Email email)
    {
        System.out.println(email);
        emailRepo.save(email);
    }

    public static Email GetEmailByID(long EmailID)
    {
        Email email = emailRepo.getById(EmailID);
        return  email;
    }
    public static User GetUserByAddress(String username)
    {
        User user = userRepo.getByAddress(username);
        return user;
    }
    public static void AddUserToDataBase(User user)
    {
        userRepo.save(user);
    }

    public static void AddContactToDataBase(Contact contact){
        contactRepo.save(contact);
    }

    public static void RemoveContactFromDataBase(Contact contact){
        contactRepo.delete(contact);
    }

    public static void AddAttachmentToDataBase(Attachment attachment){ attachmentRepo.save(attachment); }
}
