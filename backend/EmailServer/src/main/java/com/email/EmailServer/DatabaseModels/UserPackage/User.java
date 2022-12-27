package com.email.EmailServer.DatabaseModels.UserPackage;


import com.email.EmailServer.DatabaseModels.Folder;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Column(name = "user_firstName" , length = 128)
    private String FirstName;

    @Column(name = "user_lastName" , length = 128)
    private String LastName;

    @Id
    @Column(name = "user_address", length = 128, nullable = false)
    private String Address;

    @Column(name = "user_password")
    private String Password;

    @Column(name = "user_Date", updatable = false)
    private Date Date;

    private ArrayList<Folder> Folders;

    public String GetAdress()
    {
        return this.Address;
    }

    public String GetPassword()
    {
        return this.Password;
    }
    public String GetFirstName()
    {
        return this.FirstName;
    }
    public String GetLastName()
    {
        return this.LastName;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (obj instanceof User) return false;

        User OtherUser = (User) obj;
        return (this.GetAdress() == OtherUser.GetAdress());
    }
}








