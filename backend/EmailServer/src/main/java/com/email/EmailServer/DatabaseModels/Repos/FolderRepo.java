package com.email.EmailServer.DatabaseModels.Repos;

import com.email.EmailServer.DatabaseModels.Folder.Folder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FolderRepo extends JpaRepository<Folder,Long> {
}
