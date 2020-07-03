package com.org.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Entity
@Data
@Table(name = "carts", schema = "dorebookstore")
@Proxy(lazy = false)
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer ID;

    @ManyToOne(cascade = CascadeType.MERGE, targetEntity = User.class)
    @JoinColumn(name = "uid", referencedColumnName = "ID")
    private User user;

    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "bid", referencedColumnName = "ID")
    private Book book;

    @Column(name = "count")
    private Integer count;

    @Column(name = "price")
    private Double price;
}
