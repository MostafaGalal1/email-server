package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.ArrayList;

public interface EmailCriteria
{
    public ArrayList<Email> MeetCriteria(ArrayList<Email> list);
}
