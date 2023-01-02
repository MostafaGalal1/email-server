package com.email.EmailServer.commands.contactCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

import java.util.List;

public class GetAllContacts implements ICommand {
    private String userAddress;

    public GetAllContacts(JSONObject Data){
        this.userAddress = Data.getString("username");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        List<JSONObject> contactNames= userFacade.GetAllContacts();
        return CreateApi(contactNames);
    }
    private JSONObject CreateApi(List<JSONObject> contactNames){
        JSONObject Api = new JSONObject();
        return Api.put("state","success").put("data",contactNames).put("message","All contacts");
    }
}
