package com.org.backend.Repository;

import com.org.backend.Entity.Avatar;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AvatarRepository extends MongoRepository<Avatar, Integer> {

}
