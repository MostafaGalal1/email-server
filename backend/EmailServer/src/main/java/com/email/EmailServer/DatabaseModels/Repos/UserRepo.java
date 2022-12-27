package com.email.EmailServer.DatabaseModels.Repos;

import com.email.EmailServer.DatabaseModels.UserPackage.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User,String> {
    User getByAddress(String email);

}
