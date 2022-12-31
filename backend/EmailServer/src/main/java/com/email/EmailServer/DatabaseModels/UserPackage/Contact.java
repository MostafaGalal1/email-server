package com.email.EmailServer.DatabaseModels.UserPackage;

import com.email.EmailServer.DatabaseModels.ServerSystem;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "contacts")
public class Contact {

    @Id
    @Column(name = "contact_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name="user_id", nullable = false)
    private User user;

    @Column(name = "addresses")
    private List<String> addresses;

    @Column(name = "contact_name")
    private String name;

    private Contact()
    {

    }

    public Contact(String Name, List<String> Addresses, User User)
    {
        this.name = Name;
        this.addresses = Addresses;
        this.user = User;
        ServerSystem.AddContactToDataBase(this);
    }
    
}
