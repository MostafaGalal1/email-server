package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;
import com.email.EmailServer.DatabaseModels.Folder;

import java.util.ArrayList;

public class CriteriaFolder implements EmailCriteria
{
    private Folder Folder;

    public CriteriaFolder(Folder folder)
    {
        this.Folder = folder;
    }

    @Override
    public ArrayList<Email> MeetCriteria(ArrayList<Email> list)
    {
        ArrayList<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            if (this.Folder.hasEmail(email.GetID()))
                newList.add(email);
        }
        return newList;
    }
}
