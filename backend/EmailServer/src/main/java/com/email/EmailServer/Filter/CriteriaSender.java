package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;

public class CriteriaSender implements EmailCriteria
{
    private String SenderHandle;

    public CriteriaSender(String senderHandle)
    {
        this.SenderHandle = senderHandle;
    }

    @Override
    public ArrayList<Email> MeetCriteria(ArrayList<Email> list)
    {
        ArrayList<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            if (email.GetSenderHandle() != this.SenderHandle)
                newList.add(email);
        }

        return newList;
    }
}
