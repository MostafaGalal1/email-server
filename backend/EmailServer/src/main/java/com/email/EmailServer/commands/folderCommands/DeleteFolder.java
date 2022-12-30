package com.email.EmailServer.commands.folderCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class DeleteFolder implements ICommand {

    private String userAddress;
    private String folderName;

    public DeleteFolder(JSONObject Data){
        this.userAddress = Data.getString("username");
        this.folderName = Data.getString("folderName");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean state =  userFacade.DeleteFolder(this.folderName);
        return CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.folderName).put("message","Folder deleted successfully");
        }else{
            return Api.put("state","failed").put("data",this.folderName).put("message","Folder doesn't exist");
        }
    }
}
