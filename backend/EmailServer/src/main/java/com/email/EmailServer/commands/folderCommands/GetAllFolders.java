package com.email.EmailServer.commands.folderCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

import java.util.List;

public class GetAllFolders implements ICommand {

    private String userAddress;

    public GetAllFolders(JSONObject Data){
        this.userAddress = Data.getString("username");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        List<String> folderNames= userFacade.GetAllFolderNames();
        return CreateApi(folderNames);
    }

    private JSONObject CreateApi(List<String> folderNames){
        JSONObject Api = new JSONObject();
        return Api.put("state","success").put("data",folderNames).put("message","Secondary folders");
    }
}
