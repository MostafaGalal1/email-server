package com.email.EmailServer.commands;

import org.json.JSONObject;

public class LogIn implements ICommand{
    @Override
    public JSONObject execute(JSONObject data) {
        return ServerSystem.ValidateUser(data);
    }
}