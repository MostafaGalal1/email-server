package com.email.EmailServer.DatabaseModels.Repos;

import com.email.EmailServer.DatabaseModels.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,Long> {
   User getByAddress(String username);
}
