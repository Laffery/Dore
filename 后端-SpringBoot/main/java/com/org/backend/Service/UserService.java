package com.org.backend.Service;

import com.org.backend.Entity.User;

import java.util.List;

public interface UserService {
    User getByID(Integer id);

    User getByName(String name);

    List<User> getAll();

    List<User> getPage(Integer no, Integer size);

    String save(User user);

    String update(User user);

    void delete(Integer id);
}
