package com.email.EmailServer.commands;

import com.email.EmailServer.DatabaseModels.Folder;
import com.email.EmailServer.DatabaseModels.Repos.FolderRepo;
import com.email.EmailServer.DatabaseModels.Repos.UserRepo;
import com.email.EmailServer.DatabaseModels.UserPackage.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;


import java.util.Date;

@Component
public class ServerSystem{

    @Autowired
    private static UserRepo userRepo;
    @Autowired
    private static FolderRepo folderRepo;
    //private User currentUser;

    public ServerSystem(UserRepo UserRepo, FolderRepo FolderRepo) {
        this.userRepo = UserRepo;
        this.folderRepo = FolderRepo;
    }

    /*public ServerSystem(UserRepo userRepo, Long UserId) {
        this.userRepo = userRepo;
        currentUser = userRepo.getById(UserId);
    }*/
    public static JSONObject CreateNewUser(JSONObject UserInfo)
    {
        JSONObject Api = new JSONObject();
        if(userRepo.getByAddress(String.valueOf(UserInfo.get("username"))) != null)
        {
            return Api.put("state","Failed").put("data","").put("message","Username is used");
        }
        User user = new User();
        user.setFirstName(String.valueOf(UserInfo.get("first_name")));
        user.setLastName(String.valueOf(UserInfo.get("last_name")));
        user.setAddress(String.valueOf(UserInfo.get("username")));
        user.setPassword(String.valueOf(UserInfo.get("password")));
        user.setDate(new Date());
        userRepo.save(user);
        // add folders
        return Api.put("state","Success").put("data","").put("message","Created successfully");
    }

    public static JSONObject ValidateUser(JSONObject UserInfo)
    {
        JSONObject Api = new JSONObject();
        User user = userRepo.getByAddress(String.valueOf(UserInfo.get("username")));
        if(user == null){
            return Api.put("state","Failed").put("data","").put("message","Wrong username or wrong password");
        }
        if(!user.getPassword().equals(String.valueOf(UserInfo.get("password")))){
            return Api.put("state","Failed").put("data","").put("message","Wrong username or wrong password");
        }
        return Api.put("state","Success").put("data","").put("message","LogeIn successfully");
    }

}
