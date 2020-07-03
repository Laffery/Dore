package com.org.backend.Repository;

import com.org.backend.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {
    @Query("select c from Cart c where c.user.ID = :uid")
    List<Cart> getCartsByUserID(@Param("uid") Integer uid);

    @Query("select c from Cart c where c.user.name = :name")
    List<Cart> getCartsByUserName(@Param("name") String name);
}
