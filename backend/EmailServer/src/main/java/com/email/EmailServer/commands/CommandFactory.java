package com.email.EmailServer.commands;

import com.email.EmailServer.commands.folderCommands.AddFolder;
import com.email.EmailServer.commands.folderCommands.DeleteFolder;
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
        }
        return command;
    }
}
