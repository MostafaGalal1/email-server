package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class CriteriaContent implements EmailCriteria
{
    private String[] Words;

    private String Content;
    private final String ObjectInJson = "date";
    private boolean CritiriaActive = true;

    public CriteriaContent(JSONObject jsonObject)
    {
        if (jsonObject.has(this.ObjectInJson) == false)
        {
            this.CritiriaActive = false;
            return;
        }
        String Content = jsonObject.getString(this.ObjectInJson);

        this.Words = Content.split(" ");
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
            for (String Word : Words)
            {
                if (email.ContentHasWord(Word))
                {
                    newList.add(email);
                    break;
                }
            }
        }
        return newList;
    }
}
