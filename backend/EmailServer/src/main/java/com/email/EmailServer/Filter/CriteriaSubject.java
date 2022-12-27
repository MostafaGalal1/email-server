package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;

public class CriteriaSubject implements EmailCriteria
{
    private String Subject;

    public CriteriaSubject(String subject)
    {
        this.Subject = subject;
    }

    @Override
    public ArrayList<Email> MeetCriteria(ArrayList<Email> list)
    {
        ArrayList<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            if (this.Subject.equals(email.GetSubject()))
                newList.add(email);
        }
        return newList;
    }
}
