package com.email.EmailServer.DatabaseModels.Repos;

import com.email.EmailServer.DatabaseModels.User.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<Contact,Long> {
}
