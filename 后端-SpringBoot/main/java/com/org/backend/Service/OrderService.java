package com.org.backend.Service;

import com.org.backend.Entity.Order;
import com.org.backend.Util.bookSell;
import com.org.backend.Util.userBuy;

import java.util.Date;
import java.util.List;

public interface OrderService {
    Order getByID(Integer id);

    List<Order> getAll();

    List<Order> getPage(Integer no, Integer size);

    List<Order> getByUserID(Integer id);

    List<Order> During(Date start, Date end);

    List<Order> userDuring(Integer uid, Date start, Date end);

    List<bookSell> sellRank(Date start, Date end);

    List<userBuy> buyRank(Date start, Date end);

    userBuy bought(int id, Date start, Date end);

    String save(Order order);

    void delete(Integer id);
}
