package com.org.backend.Dao;

import com.org.backend.Entity.Cart;

import java.util.List;

public interface CartDao {
    Cart getOne(Integer id);

    List<Cart> getAllByUserID(Integer id);

    List<Cart> getAllByUserName(String name);

    void save(Cart cart);

    void update(Cart cart);

    void delete(Integer id);
}
