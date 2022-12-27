package com.email.EmailServer.DatabaseModels.SystemPackage;


import com.email.EmailServer.DatabaseModels.Email;
import com.sun.tools.javac.Main;

import java.util.HashMap;

public class MainSystem
{
    private static HashMap<Integer, Email> Emails = new HashMap<>();

    public static Email GetEmailById(int id)
    {
        return MainSystem.Emails.get(id);
    }
}
