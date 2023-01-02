package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class DeleteEmailPermanently implements ICommand
{
    private String userAddress;
    private long emailID;

    public DeleteEmailPermanently(String userAddress, long EmailID)
    {
        this.userAddress = userAddress;
        this.emailID = EmailID;
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean State = userFacade.DeleteEmailPermanently(this.emailID);
        return CreateApi(State);
    }

    private JSONObject CreateApi(boolean State)
    {
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.userAddress).put("message","Email deleted successfully");
        }else{
            return Api.put("state","failed").put("data",this.userAddress).put("message","Email doesn't exist in trash");
        }
    }
}
