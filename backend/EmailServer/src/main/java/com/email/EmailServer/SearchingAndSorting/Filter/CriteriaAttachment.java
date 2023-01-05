package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;
import com.email.EmailServer.commands.ICommand;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class CriteriaAttachment implements EmailCriteria
{
    private String SenderHandle;
    private final String ObjectInJson = "attachment";
    private boolean CritiriaActive = true;

    public CriteriaAttachment(JSONObject jsonObject)
    {
        boolean active = jsonObject.getBoolean(this.ObjectInJson);
        this.CritiriaActive = active;
    }

    @Override
    public List<Email> MeetCriteria(List<Email> list)
    {
        if (this.CritiriaActive == false)
        {
            return list;
        }

        List<Email> newList = new ArrayList<>();

        for (Email email : list)
        {
            String senderadress = email.getSenderAddress();
            if (email.HashAttachment())
                newList.add(email);
        }

        return newList;
    }
}
