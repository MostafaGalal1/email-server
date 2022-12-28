package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;

public class CriteriaReceiver implements EmailCriteria
{
    private String ReceiverHandle;

    public CriteriaReceiver(String ReceiverHandle)
    {
        this.ReceiverHandle = ReceiverHandle;
    }

    @Override
    public ArrayList<Email> MeetCriteria(ArrayList<Email> list)
    {
        ArrayList<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            for (String receiverHandle : email.getReceiversHandle())
                if (receiverHandle.equals(this.ReceiverHandle))
                    newList.add(email);
        }

        return newList;
    }
}
