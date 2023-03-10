package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.User.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

public class MoveEmailToFolder implements ICommand
{
    private String userAddress;
    private long emailID;
    private String newFolder;

    public MoveEmailToFolder(JSONObject Data)
    {
        this.userAddress = Data.getString("username");
        this.emailID  =Data.getLong("id");
        this.newFolder = Data.getString("folderName");
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.userAddress);
        boolean State = userFacade.MoveEmailToFolderRequest(newFolder, this.emailID);
        return CreateApi(State);
    }

    private JSONObject CreateApi(boolean State)
    {
        JSONObject Api = new JSONObject();
        if(State){
            return Api.put("state","success").put("data",this.userAddress).put("message","Email saved to Draft successfully");
        }else{
            return Api.put("state","failed").put("data",this.userAddress).put("message","Receiver doesn't exist");
        }
    }
}
