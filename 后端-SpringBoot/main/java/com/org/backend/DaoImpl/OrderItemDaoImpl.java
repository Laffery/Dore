package com.org.backend.DaoImpl;

import com.org.backend.Dao.OrderItemDao;
import com.org.backend.Entity.OrderItem;
import com.org.backend.Repository.OrderItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class OrderItemDaoImpl implements OrderItemDao {
    @Autowired
    OrderItemRepository orderItemRepository;

    @Override
    public OrderItem getOne(Integer id) {
        return orderItemRepository.getOne(id);
    }

    @Override
    public List<OrderItem> getByOrderID(Integer id) {
        return orderItemRepository.findOrderItemsByOrderID(id);
    }

    @Override
    public void save(OrderItem orderItem) {
        orderItemRepository.save(orderItem);
    }

    @Override
    public void update(OrderItem orderItem) {
        save(orderItem);
    }

    @Override
    public void delete(Integer id) {
        orderItemRepository.deleteById(id);
    }
}
