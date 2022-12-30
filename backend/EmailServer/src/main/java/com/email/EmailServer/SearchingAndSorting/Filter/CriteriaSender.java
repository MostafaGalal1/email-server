package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class CriteriaSender implements EmailCriteria
{
    private String SenderHandle;
    private final String ObjectInJson = "sender";
    private boolean CritiriaActive = true;

    public CriteriaSender(JSONObject jsonObject)
    {
        if (jsonObject.has(this.ObjectInJson) == false)
        {
            this.CritiriaActive = false;
            return;
        }
        this.SenderHandle = jsonObject.getString(this.ObjectInJson);
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
            String senderadress = email.getSenderAddress();
            if (email.getSenderAddress().equals(this.SenderHandle))
                newList.add(email);
        }

        return newList;
    }
}
