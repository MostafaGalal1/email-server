package com.email.EmailServer.commands.UserVerificationCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class SignUp implements ICommand {

    private String firstName;
    private String lastName;
    private String username;
    private String password;

    public SignUp(JSONObject Data){
        this.firstName = Data.getString("firstName");
        this.lastName = Data.getString("lastName");
        this.username = Data.getString("username");
        this.password = Data.getString("password");
    }
    @Override
    public JSONObject execute() {
        boolean state = UserFacade.CreateNewUser(this.firstName, this.lastName, this.username, this.password);
        return CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.username).put("message","User Created successfully");
        }else{
            return Api.put("state","failed").put("data",this.username).put("message","Username is used");
        }
    }
}
