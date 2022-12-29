package com.email.EmailServer.commands.folderCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.User;
import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import com.email.EmailServer.commands.ServerSystem;
import org.json.JSONObject;

public class DeleteFolder implements ICommand {

    private User user;
    private String folderName;
    public DeleteFolder(JSONObject Data){
        this.user = ServerSystem.GetUserByAddress(Data.getString("username"));
        this.folderName = Data.getString("folderName");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.user);
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
