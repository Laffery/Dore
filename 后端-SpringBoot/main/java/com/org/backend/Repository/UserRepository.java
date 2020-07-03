package com.org.backend.Repository;

import com.mongodb.lang.Nullable;
import com.org.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Nullable
    @Query("select u from User u where u.name = :name")
    User getUserByName(@Param("name") String name);

    @Nullable
    @Query("select u from User u where u.ID = :id")
    User getUserByID(@Param("id") Integer id);
}
