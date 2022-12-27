package com.email.EmailServer.DatabaseModels;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;

public class Email
{
    private int ID;
    private String SenderHander;
    private ArrayList<String> ReceiversHandle = new ArrayList<>();

    private String Subject;
    private String Content;
    private Date DateOfEmail;
    private int priority;
    private HashSet<String> ContentSet;


    private void SetContentSet()
    {
        this.ContentSet = new HashSet<>();

        String[] ContentWords = this.Content.split(" ");

        for (String Word : ContentWords)
            ContentSet.add(Word);
    }

    public int GetID()
    {
        return this.ID;
    }
    public String GetSenderHandle()
    {
        return this.SenderHander;
    }
    public ArrayList<String> GetReceiversHandle()
    {
        return this.ReceiversHandle;
    }
    public Date GetDate()
    {
        return this.DateOfEmail;
    }
    public String GetContent()
    {
        return this.Content;
    }
    public String GetSubject()
    {
        return this.Subject;
    }
    public boolean ContentHasWord(String Word)
    {
        return this.ContentSet.contains(Word);
    }

    @Override
    public boolean equals(Object obj)
    {
        if (obj instanceof Email) return false;

        Email OtherEmail = (Email) obj;
        return (this.GetID() == OtherEmail.GetID());
    }
}
