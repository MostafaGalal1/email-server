package com.email.EmailServer.DatabaseModels;

public class SecondaryFolder extends Folder
{
    public SecondaryFolder(int id, String name)
    {
        super(id, name);
    }

    public void Rename(String Name)
    {
        this.SetName(Name);
    }
}
