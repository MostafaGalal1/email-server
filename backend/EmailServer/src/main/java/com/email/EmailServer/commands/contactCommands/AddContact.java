package com.email.EmailServer.commands.contactCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import com.google.gson.Gson;
import org.json.JSONObject;

import java.util.List;

public class AddContact implements ICommand {

    private String userAddress;
    private String contactName;
    private List<String> addresses;

    public AddContact(JSONObject Data){
        this.userAddress = Data.getString("username");
        this.contactName = Data.getString("contactName");
        this.addresses = new Gson().fromJson(Data.getJSONArray("addresses").toString(), List.class);
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        Boolean state = userFacade.AddContact(this.contactName, this.addresses);
        return this.CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.contactName).put("message","Contact added successfully");
        }else{
            return Api.put("state","failed").put("data",this.contactName).put("message","Contact exist");
        }
    }
}
