package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import com.email.EmailServer.DatabaseModels.Folder.Folder;

import java.util.ArrayList;
import java.util.List;

public class CriteriaFolder implements EmailCriteria
{
    private Folder Folder;

    public CriteriaFolder(Folder folder)
    {
        this.Folder = folder;
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        List<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            if (this.Folder.HasEmail(email.getId()))
                newList.add(email);
        }
        return newList;
    }
}
