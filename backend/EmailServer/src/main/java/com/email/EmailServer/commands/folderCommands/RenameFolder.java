package com.email.EmailServer.commands.folderCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.User;
import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import com.email.EmailServer.commands.ServerSystem;
import org.json.JSONObject;

public class RenameFolder implements ICommand {

    private User user;
    private String oldName;
    private String newName;
    public RenameFolder(JSONObject Data){
        this.user = ServerSystem.GetUserByAddress(Data.getString("username"));
        this.oldName = Data.getString("oldName");
        this.newName = Data.getString("newName");
    }

    @Override
    public JSONObject execute() {
        UserFacade userFacade = new UserFacade(this.user);
        boolean state =  userFacade.RenameFolder(this.oldName, this.newName);
        return CreateApi(state);
    }

    private JSONObject CreateApi(boolean State){
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data","").put("message","Folder renamed successfully");
        }else{
            return Api.put("state","failed").put("data","").put("message","Folder doesn't exist");
        }
    }
}
