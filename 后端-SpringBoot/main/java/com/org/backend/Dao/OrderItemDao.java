package com.org.backend.Dao;

import com.org.backend.Entity.OrderItem;

import java.util.List;

public interface OrderItemDao {
    OrderItem getOne(Integer id);

    List<OrderItem> getByOrderID(Integer id);

    void save(OrderItem orderItem);

    void update(OrderItem orderItem);

    void delete(Integer id);
}
