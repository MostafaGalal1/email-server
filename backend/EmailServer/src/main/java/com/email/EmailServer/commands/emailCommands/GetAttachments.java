package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

import java.util.List;

public class GetAttachments implements ICommand {
    private String userAddress;
    private long emailID;

    public GetAttachments(JSONObject Data)
    {
        this.userAddress = Data.getString("username");
        this.emailID = Data.getLong("id");
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.userAddress);
        List<JSONObject> files = userFacade.GetEmailAttachmentsById(this.emailID);
        return CreateApi(files);
    }

    private JSONObject CreateApi(List<JSONObject> files)
    {
        JSONObject Api = new JSONObject();
        return Api.put("state","success").put("data",files).put("message","Email attachments");
    }
}
