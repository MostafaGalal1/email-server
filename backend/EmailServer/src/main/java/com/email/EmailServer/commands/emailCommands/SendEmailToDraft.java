package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class SendEmailToDraft implements ICommand
{
    private String userAddress;
    private JSONObject email;

    public SendEmailToDraft(String userAdress, JSONObject data)
    {
        this.userAddress = userAdress;
        this.email = data;
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean State = userFacade.SendEmailToDraftRequest(this.email);
        return CreateApi(State);
    }

    private JSONObject CreateApi(boolean State)
    {
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.userAddress).put("message","Email saved to Draft successfully");
        }else{
            return Api.put("state","failed").put("data",this.userAddress).put("message","Receiver doesn't exist");
        }
    }
}
