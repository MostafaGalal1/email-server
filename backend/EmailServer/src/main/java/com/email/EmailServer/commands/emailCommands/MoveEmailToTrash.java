package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class MoveEmailToTrash implements ICommand
{
    private String userAddress;
    private long emailID;

    public MoveEmailToTrash(JSONObject Data)
    {
        this.userAddress = Data.getString("username");
        this.emailID  =Data.getLong("id");
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean State = userFacade.SendEmailToTrashRequest(this.emailID);
        return CreateApi(State);
    }

    private JSONObject CreateApi(boolean State)
    {
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.userAddress).put("message","Email moved successfully");
        }else{
            return Api.put("state","failed").put("data",this.userAddress).put("message","Email already exist in trash");
        }
    }
}
