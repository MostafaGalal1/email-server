package com.email.EmailServer.commands;

import org.json.JSONObject;

public class SignUp implements ICommand{
    @Override
    public JSONObject execute(JSONObject data) {
        JSONObject Api = ServerSystem.CreateNewUser(data);
        return  Api;
    }
}
