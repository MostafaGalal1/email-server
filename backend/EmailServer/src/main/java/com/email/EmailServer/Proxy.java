package com.email.EmailServer;

import com.email.EmailServer.Immutables.InputData;
import com.email.EmailServer.commands.CommandFactory;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
public class Proxy {
    private final CommandFactory commandFactory;

    public Proxy() {
        this.commandFactory = CommandFactory.getInstance();
    }

    public synchronized String run(String command, JSONObject data){
        return commandFactory.create(command).execute(data).toString();
    }


}
