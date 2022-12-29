package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;
import java.util.List;

public class CriteriaSender implements EmailCriteria
{
    private String SenderHandle;

    public CriteriaSender(String senderHandle)
    {
        this.SenderHandle = senderHandle;
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        List<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            if (email.getSenderHandle() != this.SenderHandle)
                newList.add(email);
        }

        return newList;
    }
}
