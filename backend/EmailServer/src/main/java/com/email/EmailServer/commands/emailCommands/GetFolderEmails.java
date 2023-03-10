package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

import java.util.List;

public class GetFolderEmails implements ICommand
{
    private String userAddress;
    private String folderName;
    private String sortOption;

    public GetFolderEmails(JSONObject Data)
    {
        this.userAddress = Data.getString("username");
        this.folderName = Data.getString("folderName");
        this.sortOption = Data.getString("sortOption");
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.userAddress);

        List<JSONObject> emailHeaders = userFacade.GetFolderEmailsRequest(folderName, this.sortOption);
        return CreateApi(emailHeaders);
    }

    private JSONObject CreateApi(List<JSONObject> emailHeaders)
    {
        JSONObject Api = new JSONObject();
        return Api.put("state","success").put("data",emailHeaders).put("message","Data found");
    }
}

