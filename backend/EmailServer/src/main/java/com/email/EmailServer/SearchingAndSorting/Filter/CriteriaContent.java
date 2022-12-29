package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;

import java.util.ArrayList;
import java.util.List;

public class CriteriaContent implements EmailCriteria
{
    private String[] Words;

    public CriteriaContent(String Content)
    {
        this.Words = Content.split(" ");
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
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
