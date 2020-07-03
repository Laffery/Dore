package com.org.backend.Dao;

import com.org.backend.Entity.Order;

import java.util.Date;
import java.util.List;

public interface OrderDao {
    Order getOne(Integer id);

    List<Order> getAll();

    List<Order> getPage(Integer pageNo, Integer pageSize);

    List<Order> getByUserID(Integer id);

    List<Order> getByDate(String date);

    void save(Order order);

    void delete(Integer id);
}
