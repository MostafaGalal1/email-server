package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class CriteriaPriority implements EmailCriteria
{
    private int Priority;
    private final String ObjectInJson = "date";
    private boolean CritiriaActive = true;

    public CriteriaPriority(JSONObject jsonObject)
    {
        if (jsonObject.has(this.ObjectInJson) == false)
        {
            this.CritiriaActive = false;
            return;
        }
        this.Priority = jsonObject.getInt(this.ObjectInJson);
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
            if (this.Priority == email.getPriority())
                newList.add(email);
        }
        return newList;
    }
}
