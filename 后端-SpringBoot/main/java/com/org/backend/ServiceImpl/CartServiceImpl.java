package com.org.backend.ServiceImpl;

import com.org.backend.DaoImpl.BookDaoImpl;
import com.org.backend.DaoImpl.CartDaoImpl;
import com.org.backend.DaoImpl.UserDaoImpl;
import com.org.backend.Entity.Book;
import com.org.backend.Entity.Cart;
import com.org.backend.Entity.User;
import com.org.backend.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    CartDaoImpl cartDao;
    @Autowired
    BookDaoImpl bookDao;
    @Autowired
    UserDaoImpl userDao;

    public List<Cart> implCarts(List<Cart> carts) {
        List<Cart> res = new ArrayList<>();
        for (Cart cart : carts) {
            Book book = bookDao.getOne(cart.getBook().getID());
            cart.setBook(book);
            User user = new User();
            user.setID(cart.getUser().getID());
            cart.setUser(user);
            res.add(cart);
        }

        return res;
    }

    @Override
    public List<Cart> getByUserID(Integer id){
        return implCarts(cartDao.getAllByUserID(id));
    }

    @Override
    public List<Cart> getByUserName(String name){
        return implCarts(cartDao.getAllByUserName(name));
    }

    @Override
    public void save(Cart cart){
        Integer bid = cart.getBook().getID();
        Integer uid = cart.getUser().getID();

        Book book = bookDao.getOne(bid);
        if (Objects.equals(bookDao.update(book), "error"))
            return;
        User user = userDao.getOne(uid);
        userDao.update(user);

        for (Cart cart1 : cartDao.getAllByUserID(uid)) {
            if (Objects.equals(cart1.getBook().getID(), bid)) {
                cart1.setCount(cart1.getCount() + cart.getCount());
                cart1.setPrice(cart1.getPrice() + cart.getPrice());
                cart = cart1;
                break;
            }
        }

        cartDao.save(cart);
    }

    @Override
    public void update(Cart cart){;
        Cart res = cartDao.getOne(cart.getID());
        res.setCount(cart.getCount());
        res.setPrice(cart.getPrice());

        cartDao.save(res);
    }

    @Override
    public void delete(Integer id){
        cartDao.delete(id);
    }
}
