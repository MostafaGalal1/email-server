package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;

public class CriteriaContent implements EmailCriteria
{
    private String[] Words;

    public CriteriaContent(String Content)
    {
        this.Words = Content.split(" ");
    }

    @Override
    public ArrayList<Email> MeetCriteria(ArrayList<Email> list)
    {
        ArrayList<Email> newList = new ArrayList<>();

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
