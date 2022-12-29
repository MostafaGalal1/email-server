package com.email.EmailServer.commands.folderCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class RenameFolder implements ICommand {

    private String userAddress;
    private String oldName;
    private String newName;
    public RenameFolder(JSONObject Data){
        this.userAddress = Data.getString("username");
        this.oldName = Data.getString("oldName");
        this.newName = Data.getString("newName");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean state =  userFacade.RenameFolder(this.oldName, this.newName);
        return CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.newName).put("message","Folder renamed successfully");
        }else{
            return Api.put("state","failed").put("data",this.oldName).put("message","Folder doesn't exist");
        }
    }
}
