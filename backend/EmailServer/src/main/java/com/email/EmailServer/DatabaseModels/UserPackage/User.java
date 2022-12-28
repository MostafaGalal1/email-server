package com.email.EmailServer.DatabaseModels.UserPackage;


import com.email.EmailServer.DatabaseModels.Folder;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User{

    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long userId;

    @Column(name = "user_firstName" , length = 128)
    private String firstName;

    @Column(name = "user_lastName" , length = 128)
    private String lastName;

    @Column(name = "user_address", length = 128)
    private String address;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_Date", updatable = false)
    private Date date;

    @OneToMany(mappedBy = "user")
    private List<Folder> folders = new ArrayList<Folder>();

    @OneToMany(mappedBy = "user")
    private List<Contact> contacts = new ArrayList<Contact>();
/*
    @Override
    public boolean equals(Object obj)
    {
        if (obj instanceof User) return false;

        User OtherUser = (User) obj;
        return (this.getAddress() == OtherUser.getAddress());
    }
    */

}








