package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;

import java.util.ArrayList;
import java.util.List;

public class CriteriaReceiver implements EmailCriteria
{
    private String ReceiverHandle;

    public CriteriaReceiver(String ReceiverHandle)
    {
        this.ReceiverHandle = ReceiverHandle;
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        List<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            for (String receiverHandle : email.getReceiversAddress())
                if (receiverHandle.equals(this.ReceiverHandle))
                    newList.add(email);
        }

        return newList;
    }
}
