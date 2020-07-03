package com.org.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "orders", schema = "dorebookstore")
@Proxy(lazy = false)
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer ID;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class)
    @JoinColumn(name = "uid", referencedColumnName = "ID")
    private User user;

    @Column(name = "price")
    private Double price;

    @Column(name = "datetime")
    private String date;

    @Transient
    private List<OrderItem> items = new ArrayList<>();

    public List<OrderItem> getItems() { return this.items; }

    public void setItems(List<OrderItem> items) { this.items = items; }
}
