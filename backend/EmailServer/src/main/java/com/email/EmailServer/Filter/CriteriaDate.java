package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class CriteriaDate implements EmailCriteria
{
    private Date date;

    public CriteriaDate(Date date)
    {
        this.date = date;
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        List<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            if (email.getDateOfEmail() != this.date)
                newList.add(email);
        }
        return newList;
    }
}
