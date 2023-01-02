package com.email.EmailServer.commands.contactCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import com.google.gson.Gson;
import org.json.JSONObject;

import java.util.List;

public class EditeContact implements ICommand {

    private String userAddress;
    private String oldName;
    private String newName;
    private List<String> addresses;

    public EditeContact(JSONObject Data){
        this.userAddress = Data.getString("username");
        this.oldName = Data.getString("oldName");
        this.newName = Data.getString("contactName");
        this.addresses = List.of(Data.getString("addresses").split(", "));
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean state =  userFacade.EditeContact(this.oldName, this.newName, this.addresses);
        return CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.newName).put("message","Contact edited successfully");
        }else{
            return Api.put("state","failed").put("data",this.oldName).put("message","Contact doesn't exist");
        }
    }

}
