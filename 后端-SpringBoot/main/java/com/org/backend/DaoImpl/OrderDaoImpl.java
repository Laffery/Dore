package com.org.backend.DaoImpl;

import com.org.backend.Dao.OrderDao;
import com.org.backend.Entity.Order;
import com.org.backend.Repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public class OrderDaoImpl implements OrderDao {
    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order getOne(Integer id){
        return orderRepository.getOne(id);
    }

    @Override
    public List<Order> getAll(){
        return orderRepository.findAll();
    }

    @Override
    public List<Order> getPage(Integer no, Integer size) {
        Page<Order> page = orderRepository.findAll((Pageable) PageRequest.of(no, size));
        return page.toList();
    }

    @Override
    public List<Order> getByUserID(Integer id){
        return orderRepository.getOrdersByUserID(id);
    }

    @Override
    public List<Order> getByDate(String date){
        return orderRepository.getOrdersByDate(date);
    }

    @Override
    public void save(Order order){
        orderRepository.save(order);
    }

    @Override
    public void delete(Integer id){
        orderRepository.deleteById(id);
    }
}
