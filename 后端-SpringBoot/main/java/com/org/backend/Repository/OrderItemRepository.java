package com.org.backend.Repository;


import com.org.backend.Entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    @Query("select o from OrderItem o where o.order.ID = :id")
    List<OrderItem> findOrderItemsByOrderID(Integer id);
}
