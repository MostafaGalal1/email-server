package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CriteriaSubject implements EmailCriteria
{
    private String Subject;
    private final String ObjectInJson = "subject";
    private boolean CritiriaActive = true;
    public CriteriaSubject(JSONObject jsonObject)
    {
        if (jsonObject.getString(this.ObjectInJson).equals(""))
        {
            this.CritiriaActive = false;
            return;
        }
        this.Subject = jsonObject.getString(this.ObjectInJson);
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
            if (this.Subject.equals(email.getSubject()))
                newList.add(email);
        }
        return newList;
    }
}
