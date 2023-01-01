package com.email.EmailServer.commands.contactCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
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
        List<String> contactNames= userFacade.GetAllContactNames();
        return CreateApi(contactNames);
    }
    private JSONObject CreateApi(List<String> contactNames){
        JSONObject Api = new JSONObject();
        return Api.put("state","success").put("data",contactNames).put("message","All contacts");
    }
}
