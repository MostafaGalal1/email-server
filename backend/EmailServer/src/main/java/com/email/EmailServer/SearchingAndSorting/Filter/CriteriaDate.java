package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CriteriaDate implements EmailCriteria
{
    private Date Date;
    private final String ObjectInJson = "date";
    private boolean CritiriaActive = true;
    public CriteriaDate(JSONObject jsonObject)
    {
        if (jsonObject.has(this.ObjectInJson) == false)
        {
            this.CritiriaActive = false;
            return;
        }
        this.Date = (Date)jsonObject.get(this.ObjectInJson);
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
            if (email.getDateOfEmail().compareTo(this.Date) == 0)
                newList.add(email);
        }
        return newList;
    }
}
