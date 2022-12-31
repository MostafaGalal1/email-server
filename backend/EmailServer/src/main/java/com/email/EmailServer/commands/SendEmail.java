package com.email.EmailServer.commands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import org.json.JSONObject;

public class SendEmail implements ICommand
{

    private String userAddress;
    private JSONObject email;

    public SendEmail(JSONObject data){
        this.userAddress = data.getString("sender");
        this.email = data;
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean State = userFacade.SendEmailToSenderAndReceiversRequest(this.email);
        return CreateApi(State);
    }

    private JSONObject CreateApi(boolean State)
    {
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.userAddress).put("message","Email sent successfully");
        }else{
            return Api.put("state","failed").put("data",this.userAddress).put("message","Receiver doesn't exist");
        }
    }
}
