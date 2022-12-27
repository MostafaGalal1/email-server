package com.email.EmailServer.commands;

import com.email.EmailServer.Immutables.InputData;
import org.json.JSONObject;

public interface ICommand {
    public JSONObject execute(JSONObject data);
}
