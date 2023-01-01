package com.email.EmailServer.commands.contactCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;


public class GetContact implements ICommand {

    private String userAddress;
    private String contactName;

    public GetContact(JSONObject Data){
        this.userAddress = Data.getString("username");
        this.contactName = Data.getString("contactName");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        JSONObject Contact = userFacade.GetContactByName(this.contactName);
        return this.CreateApi(Contact);
    }

    private JSONObject CreateApi(JSONObject Contact){
        JSONObject Api = new JSONObject();
        if(Contact != null){
            return Api.put("state","success").put("data",Contact).put("message","Data found");
        }else{
            return Api.put("state","failed").put("data",this.contactName).put("message","Contact doesn't exist");
        }
    }

}
