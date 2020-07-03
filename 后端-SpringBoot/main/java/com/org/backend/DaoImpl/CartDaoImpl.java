package com.org.backend.DaoImpl;

import com.org.backend.Dao.CartDao;
import com.org.backend.Entity.Cart;
import com.org.backend.Repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CartDaoImpl implements CartDao {
    @Autowired
    private CartRepository cartRepository;

    @Override
    public Cart getOne(Integer id){
        return cartRepository.getOne(id);
    }

    @Override
    public List<Cart> getAllByUserID(Integer id){
        return cartRepository.getCartsByUserID(id);
    }

    @Override
    public List<Cart> getAllByUserName(String name){
        return cartRepository.getCartsByUserName(name);
    }

    @Override
    public void save(Cart cart){
        cartRepository.save(cart);
    }

    @Override
    public void update(Cart cart){
        save(cart);
    }

    @Override
    public void delete(Integer id){
        cartRepository.deleteById(id);
    }
}
