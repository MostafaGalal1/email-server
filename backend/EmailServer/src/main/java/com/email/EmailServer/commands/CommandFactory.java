package com.email.EmailServer.commands;

import com.email.EmailServer.commands.UserVerificationCommands.LogIn;
import com.email.EmailServer.commands.UserVerificationCommands.SignUp;
import com.email.EmailServer.commands.contactCommands.*;
import com.email.EmailServer.commands.emailCommands.*;
import com.email.EmailServer.commands.folderCommands.AddFolder;
import com.email.EmailServer.commands.folderCommands.DeleteFolder;
import com.email.EmailServer.commands.folderCommands.GetAllFolders;
import com.email.EmailServer.commands.folderCommands.RenameFolder;
import org.json.JSONObject;

public class CommandFactory {

    private static CommandFactory instance;
    private CommandFactory(){}

    public static CommandFactory getInstance() {
        if (instance == null) {
            instance = new CommandFactory();
        }
        return instance;
    }

    public ICommand create(String Command, JSONObject Data){
        ICommand command = null;
        switch (Command.toLowerCase()){
            case "signup"-> command = new SignUp(Data);
            case "login"-> command = new LogIn(Data);
            case "addfolder"-> command = new AddFolder(Data);
            case "renamefolder"-> command = new RenameFolder(Data);
            case "deletefolder"-> command = new DeleteFolder(Data);
            case "getallfolders"-> command = new GetAllFolders(Data);
            case "sendemail"-> command = new SendEmail(Data);
            case "getfolderemails"-> command = new GetFolderEmails(Data);
            case "searchinfolder"-> command = new SearchInFolder(Data);
            case "addcontact"-> command = new AddContact(Data);
            case "getallcontacts"-> command =new GetAllContacts(Data);
            case "deletecontact"-> command = new DeleteContact(Data);
            case "editcontact"-> command = new EditeContact(Data);
            case "moveemail"-> command = new MoveEmailToFolder(Data);
            case "savetodraft"-> command = new SendEmailToDraft(Data);
            case "deleteemail"-> command = new DeleteEmailPermanently(Data);
            case "restoreemail"-> command = new RestoreEmailFromTrash(Data);
        }
        return command;
    }
}
