package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class CriteriaReceiver implements EmailCriteria
{
    private String ReceiverHandle;
    private final String ObjectInJson = "receivers";
    private boolean CritiriaActive = true;
    public CriteriaReceiver(JSONObject jsonObject)
    {
        if (jsonObject.has(this.ObjectInJson) == false)
        {
            this.CritiriaActive = false;
            return;
        }
        this.ReceiverHandle = jsonObject.getString(this.ObjectInJson);
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        if (this.CritiriaActive == false)
        {
            return list;
        }

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
