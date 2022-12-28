package com.email.EmailServer.DatabaseModels.Repos;

import com.email.EmailServer.DatabaseModels.Attachment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentRepo extends JpaRepository<Attachment,Long> {
}
