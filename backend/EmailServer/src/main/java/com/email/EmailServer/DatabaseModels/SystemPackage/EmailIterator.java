package com.email.EmailServer.DatabaseModels.SystemPackage;

import com.email.EmailServer.DatabaseModels.Email;
import com.email.EmailServer.commands.ServerSystem;
import org.hibernate.sql.Delete;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

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
        long EmailId = (long)this.MyIterator.next();
        Email WantedEmail = ServerSystem.GetEmailByID(EmailId);
        return WantedEmail;
    }

    @Override
    public void remove()
    {
        this.MyIterator.remove();
    }
}

