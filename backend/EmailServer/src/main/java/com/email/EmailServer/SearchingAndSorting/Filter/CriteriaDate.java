package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.json.JSONObject;

import java.util.*;

public class CriteriaDate implements EmailCriteria
{
    private Date StartDate;
    private Date EndDate;
    private final String StartJson = "startdate";
    private final String EndJson = "enddate";

    public CriteriaDate(JSONObject jsonObject)
    {
//        if (jsonObject.getString(this.StartJson).equals(""))
//            this.StartDate = new GregorianCalendar(1970, Calendar.FEBRUARY, 11).getTime();
//        else
//            this.StartDate = (Date)jsonObject.getString(this.StartJson)
//        this.Date = (Date)jsonObject.get(this.ObjectInJson);
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
//        if (this.CritiriaActive == false)
//        {
//            return list;
//        }

        List<Email> newList = new ArrayList<>();
//
//        for (Email email : list)
//        {
//            if (email.getDateOfEmail().compareTo(this.Date) == 0)
//                newList.add(email);
//        }
        return newList;
    }
}
