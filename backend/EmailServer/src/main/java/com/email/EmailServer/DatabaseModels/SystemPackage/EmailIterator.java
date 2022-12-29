package com.email.EmailServer.DatabaseModels.SystemPackage;

import com.email.EmailServer.DatabaseModels.Email;
import org.hibernate.sql.Delete;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;

public class EmailIterator implements Iterator
{
    private  Set<Long> Set;
    private Iterator MyIterator;

    public EmailIterator(Set<Long> set)
    {
        this.Set = set;
        this.MyIterator = this.Set.iterator();
    }

    @Override
    public boolean hasNext()
    {
        return this.MyIterator.hasNext();
    }

    @Override
    public Email next()
    {
        int EmailId = (int)this.MyIterator.next();
        Email WantedEmail = MainSystem.GetEmailById(EmailId);
        return WantedEmail;
    }

    @Override
    public void remove()
    {
        this.MyIterator.remove();
    }
}

