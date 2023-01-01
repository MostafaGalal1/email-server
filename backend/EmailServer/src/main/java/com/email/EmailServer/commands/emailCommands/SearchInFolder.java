package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

import java.util.List;

public class SearchInFolder implements ICommand {

    private String userAddress;
    private JSONObject formJson;
    private String folderName;
    private String sortOption;

    public SearchInFolder(JSONObject Data)
    {
        this.userAddress = Data.getString("username");
        this.formJson = Data.getJSONObject("searchForm");
        this.folderName = Data.getString("folderName");
        this.sortOption = Data.getString("sortOption");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        List<JSONObject> emailHeaders = userFacade.SearchAndSortEmailsInFolder(this.folderName, this.formJson, this.sortOption);
        return CreateApi(emailHeaders);
    }

    private JSONObject CreateApi(List<JSONObject> emailHeaders)
    {
        JSONObject Api = new JSONObject();
        return Api.put("state","success").put("data",emailHeaders).put("message","Data found");
    }
}
