package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;

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
            if (email.getSenderAdress() != this.SenderHandle)
                newList.add(email);
        }

        return newList;
    }
}
