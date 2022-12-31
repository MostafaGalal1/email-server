package com.email.EmailServer.commands.emailCommands;

import com.email.EmailServer.DatabaseModels.UserPackage.UserFacade;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

import java.util.List;

public class GetFolderEmails implements ICommand
{
    private String userAddress;
    private JSONObject emailJson;
    private String folderName;

    public GetFolderEmails(JSONObject Data)
    {
        this.userAddress = Data.getString("username");
        this.emailJson = Data;
        this.folderName = Data.getString("folderName");
    }

    @Override
    public JSONObject execute()
    {
        UserFacade userFacade = new UserFacade(this.userAddress);

        List<JSONObject> emailHeaders = userFacade.GetAllFolderEmailsWithFilterAndSort(folderName, this.emailJson);
        return CreateApi(emailHeaders);
    }

    private JSONObject CreateApi(List<JSONObject> emailHeaders)
    {
        JSONObject Api = new JSONObject();
        return Api.put("state","success").put("data",emailHeaders).put("message","Folder renamed successfully");
    }
}


/*

{"userName":"fgdgdfgdfdg", "currentFolder"
:"" "sender":"rgrergegr", "recievers":"["dgre","gergrege","gregreg","regrgerge"]", "priority":3, "attachment":false, "subject":"", "Date":"dfddd"
"body": "anyword"
 "sortOption": "byDate"}

{"userName":"fgdgdfgdfdg", "currentFolder":"",



 */
