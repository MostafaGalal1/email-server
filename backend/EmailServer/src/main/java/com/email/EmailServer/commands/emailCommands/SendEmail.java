package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class SendEmail implements ICommand
{
    private String senderAddress;
    private JSONObject email;

    public SendEmail(JSONObject data)
    {
        this.senderAddress = data.getString("sender");
        this.email = data;
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.senderAddress);
        boolean State = userFacade.SendEmailToSenderAndReceiversRequest(this.email);
        return CreateApi(State);
    }

    private JSONObject CreateApi(boolean State)
    {
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.senderAddress).put("message","Email saved successfully");
        }else{
            return Api.put("state","failed").put("data",this.senderAddress).put("message","Receiver doesn't exist");
        }
    }
}
