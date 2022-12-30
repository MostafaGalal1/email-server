package com.email.EmailServer.DatabaseModels;

import com.email.EmailServer.DatabaseModels.Email.Email;
import com.email.EmailServer.DatabaseModels.Repos.EmailRepo;
import com.email.EmailServer.DatabaseModels.Repos.FolderRepo;
import com.email.EmailServer.DatabaseModels.Repos.UserRepo;
import com.email.EmailServer.DatabaseModels.UserPackage.User;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ServerSystem{

    @Autowired
    private static UserRepo userRepo;
    @Autowired
    private static FolderRepo folderRepo;
    @Autowired
    private static EmailRepo emailRepo;

    public ServerSystem(UserRepo UserRepo, FolderRepo FolderRepo, EmailRepo EmailRepo)
    {
        userRepo = UserRepo;
        folderRepo = FolderRepo;
        emailRepo = EmailRepo;
    }

    public static JSONObject CreateNewUser(JSONObject UserInfo)
    {
        JSONObject Api = new JSONObject();
        if (userRepo.getByAddress(String.valueOf(UserInfo.get("username"))) != null) {
            return Api.put("state", "Failed").put("data", "").put("message", "Username is used");
        }
        User user = new User(String.valueOf(UserInfo.get("first_name")),String.valueOf(UserInfo.get("last_name")),String.valueOf(UserInfo.get("username"))
                ,String.valueOf(UserInfo.get("password")));
        return Api.put("state", "Success").put("data", "").put("message", "Created successfully");
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

    public static void AddFolderToDataBase(Folder folder)
    {
        folderRepo.save(folder);
    }

    public static void AddEmailToDatabase(Email email)
    {
        emailRepo.save(email);
    }

    public static void RemoveFolderFromDataBase(Folder folder)
    {
        folderRepo.delete(folder);
    }

    public static Email GetEmailByID(long EmailID)
    {
        Email email = emailRepo.getById(EmailID);
        return  email;
    }
    public static User GetUserByAddress(String username)
    {
        User user = userRepo.getByAddress(username);
        return user;
    }
    public static void AddUserToDataBase(User user)
    {
        userRepo.save(user);
    }
}
