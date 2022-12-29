package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;
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
