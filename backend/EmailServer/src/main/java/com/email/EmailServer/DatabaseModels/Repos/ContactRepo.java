package com.email.EmailServer.DatabaseModels.Repos;

import com.email.EmailServer.DatabaseModels.UserPackage.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepo extends JpaRepository<Contact,Long> {
}
