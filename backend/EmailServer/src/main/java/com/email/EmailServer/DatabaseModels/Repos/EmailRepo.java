package com.email.EmailServer.DatabaseModels.Repos;

import com.email.EmailServer.DatabaseModels.Email.Email;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepo extends JpaRepository<Email,Long> {
    Email getById(long EmailId);
}
