package com.org.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Entity
@Data
@Table(name = "items", schema = "dorebookstore")
@Proxy(lazy = false)
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = Order.class)
    @JoinColumn(name = "oid", referencedColumnName = "ID")
    @JsonIgnore
    private Order order;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "bid", referencedColumnName = "ID")
    private Book book;

    @Column(name = "count")
    private Integer count;

    @Column(name = "price")
    private Double price;
}
