package com.org.backend.Repository;

import com.org.backend.Entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    @Query("select o from Order o where o.user.ID = :uid")
    List<Order> getOrdersByUserID(@Param("uid") Integer uid);

    @Query("select o from Order o where o.date = :date")
    List<Order> getOrdersByDate(@Param("date") String date);
}
