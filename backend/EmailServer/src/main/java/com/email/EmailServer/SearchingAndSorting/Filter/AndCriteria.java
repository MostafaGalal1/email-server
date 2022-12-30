package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;

import java.util.List;

public class AndCriteria implements EmailCriteria
{
    List<EmailCriteria> AllCriteria;

    public AndCriteria(List<EmailCriteria> allCriteria)
    {
        this.AllCriteria = allCriteria;
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        for (EmailCriteria emailCriteria : this.AllCriteria)
        {
            list = emailCriteria.MeetCriteria(list);
        }
        return list;
    }
}
