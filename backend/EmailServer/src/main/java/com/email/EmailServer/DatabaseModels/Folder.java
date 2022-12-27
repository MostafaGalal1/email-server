package com.email.EmailServer.DatabaseModels;


import com.email.EmailServer.DatabaseModels.SystemPackage.EmailIterator;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public abstract class  Folder
{
    private int ID;
    private String Name;
    private HashSet<Integer> EmailIds;

    public Folder(int id, String name)
    {
        this.ID = id;
        this.Name = name;
        this.EmailIds = new HashSet<>();
    }

    protected void SetName(String newName)
    {
        this.Name = newName;
    }

    public int GetID()
    {
        return this.ID;
    }

    public boolean hasEmail(int EmailId)
    {
        return this.EmailIds.contains(EmailId);
    }

    public EmailIterator GetFolderEmailsIterator()
    {
        return new EmailIterator(this.EmailIds);
    }
}
