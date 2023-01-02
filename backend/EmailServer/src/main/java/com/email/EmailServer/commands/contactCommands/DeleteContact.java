package com.email.EmailServer.commands.contactCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class DeleteContact implements ICommand {

    private String userAddress;
    private String contactName;

    public DeleteContact(JSONObject Data){
        this.userAddress = Data.getString("username");
        this.contactName = Data.getString("contactName");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean state =  userFacade.DeleteContact(this.contactName);
        return CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.contactName).put("message","Contact deleted successfully");
        }else{
            return Api.put("state","failed").put("data",this.contactName).put("message","Contact doesn't exist");
        }
    }
}
