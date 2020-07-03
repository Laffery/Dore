package com.org.backend.Service;

import com.org.backend.Entity.Cart;

import java.util.List;

public interface CartService {
    List<Cart> getByUserID(Integer id);

    List<Cart> getByUserName(String name);

    void save(Cart cart);

    void update(Cart cart);

    void delete(Integer id);
}
