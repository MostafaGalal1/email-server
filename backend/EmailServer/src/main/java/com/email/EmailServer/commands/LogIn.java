package com.email.EmailServer.commands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import org.json.JSONObject;

public class LogIn implements ICommand{
    private String username;
    private String password;

    public LogIn(JSONObject Data){
        this.username = Data.getString("username");
        this.password = Data.getString("password");
    }
    @Override
    public JSONObject execute() {
        boolean state = UserFacade.ValidateUser(this.username, this.password);
        return CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.username).put("message","LogeIn successfully");
        }else{
            return Api.put("state","failed").put("data",this.username).put("message","Wrong username or wrong password");
        }
    }
}
