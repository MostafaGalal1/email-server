package com.email.EmailServer.DatabaseModels;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Column(name = "user_firstName" , length = 128)
    private String firstName;

    @Column(name = "user_lastName" , length = 128)
    private String LastName;

    @Id
    @Column(name = "user_address", length = 128, nullable = false)
    private String address;

    @Column(name = "user_password")
    private String password;

    @Column(name = "user_Date", updatable = false)
    private Date date;
}