package com.email.EmailServer.Filter;

import com.email.EmailServer.DatabaseModels.Email;

import java.util.List;

public interface EmailCriteria
{
    public List<Email> MeetCriteria(List<Email> list);
}
