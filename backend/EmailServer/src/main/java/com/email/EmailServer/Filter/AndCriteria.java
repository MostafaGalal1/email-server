package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;

public class AndCriteria implements EmailCriteria
{
    ArrayList<EmailCriteria> AllCriteria;

    public AndCriteria(ArrayList<EmailCriteria> allCriteria)
    {
        this.AllCriteria = allCriteria;
    }

    @Override
    public ArrayList<Email> MeetCriteria(ArrayList<Email> list)
    {
        for (EmailCriteria emailCriteria : this.AllCriteria)
        {
            list = emailCriteria.MeetCriteria(list);
        }
        return list;
    }
}
