package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;
import com.email.EmailServer.DatabaseModels.Folder;

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
            if (this.Folder.HasEmail(email.getEmailId()))
                newList.add(email);
        }
        return newList;
    }
}
