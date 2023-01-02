package com.email.EmailServer.commands.folderCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class AddFolder implements ICommand {

    private String userAddress;
    private String folderName;

    public AddFolder(JSONObject Data){
        this.userAddress = Data.getString("username");
        this.folderName = Data.getString("folderName");
    }
    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        Boolean state = userFacade.AddFolder(this.folderName);
        return this.CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.folderName).put("message","Folder created successfully");
        }else{
            return Api.put("state","failed").put("data",this.folderName).put("message","Folder exist");
        }
    }
}
