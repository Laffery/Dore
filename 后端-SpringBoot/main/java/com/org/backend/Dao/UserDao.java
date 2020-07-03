package com.org.backend.Dao;

import com.org.backend.Entity.User;

import java.util.List;

public interface UserDao {
    User getOne(Integer id);

    User getByName(String name);

    List<User> getAll();

    List<User> getPage(Integer no, Integer size);

    void save(User user);

    void update(User user);

    void delete(Integer id);
}
