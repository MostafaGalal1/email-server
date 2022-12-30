package com.email.EmailServer.SearchingAndSorting.Filter;

import com.email.EmailServer.DatabaseModels.Email.Email;

import java.util.List;

public interface EmailCriteria
{
    public List<Email> MeetCriteria(List<Email> list);
}
