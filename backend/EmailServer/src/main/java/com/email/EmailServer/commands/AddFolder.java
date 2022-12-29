package com.email.EmailServer.commands;

import com.email.EmailServer.DatabaseModels.UserPackage.User;
import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import org.json.JSONObject;

public class AddFolder implements ICommand{

    @Override
    public JSONObject execute(JSONObject data) {
        JSONObject Api = new JSONObject();
        User user = ServerSystem.GetUserByAddress(data.getString("username"));
        UserFacade userFacade = new UserFacade(user);
        Boolean state = userFacade.AddFolder(data.getString("folderName"));
        if(state){
            return Api.put("state","success").put("data","").put("message","Folder created successfully");
        }else{
            return Api.put("state","failed").put("data","").put("message","Folder exist");
        }
    }
}
