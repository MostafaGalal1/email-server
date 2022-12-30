package com.email.EmailServer.commands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import org.json.JSONObject;

public class SaveToDraft implements ICommand
{
    private String userAddress;
    private String folderName;

    public SaveToDraft(JSONObject Data)
    {
    }

    @Override
    public JSONObject execute()
    {
        return null;
    }

    private JSONObject CreateApi(boolean State)
    {
        return null;
    }
}
