package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;
import java.util.List;

public class CriteriaSubject implements EmailCriteria
{
    private String Subject;

    public CriteriaSubject(String subject)
    {
        this.Subject = subject;
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        List<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            if (this.Subject.equals(email.getSubject()))
                newList.add(email);
        }
        return newList;
    }
}
