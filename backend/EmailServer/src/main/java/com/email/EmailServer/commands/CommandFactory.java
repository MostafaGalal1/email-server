package com.email.EmailServer.commands;

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

    public ICommand create(String Command){
        ICommand command = null;
        switch (Command.toLowerCase()){
            case "signup"-> command = new SignUp();
            case "login"-> command = new LogIn();
            case "addfolder"-> command = new AddFolder();
        }
        return command;
    }
}
