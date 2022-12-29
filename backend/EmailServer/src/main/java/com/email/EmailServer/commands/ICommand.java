package com.email.EmailServer.commands;


import org.json.JSONObject;

public interface ICommand {
    public JSONObject execute();
}
