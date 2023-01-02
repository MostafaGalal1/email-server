package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class SendEmail implements ICommand
{
    private String senderAdress;
    private JSONObject email;

    public SendEmail(JSONObject data)
    {
        this.senderAdress = data.getString("sender");
        this.email = data;
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.senderAdress);
        boolean State = userFacade.SendEmailToDraftRequest(this.email);
        return CreateApi(State);
    }

    private JSONObject CreateApi(boolean State)
    {
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.senderAdress).put("message","Email saved to draft successfully");
        }else{
            return Api.put("state","failed").put("data",this.senderAdress).put("message","Receiver doesn't exist");
        }
    }
}
