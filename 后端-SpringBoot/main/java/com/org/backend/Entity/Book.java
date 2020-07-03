package com.org.backend.Entity;

import lombok.Data;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Entity
@Data
@Table(name = "books", schema = "dorebookstore")
@Proxy(lazy = false)
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer ID;

    @Column(name = "ISBN")
    private String isbn;

    @Column(name = "title")
    private String title;

    @Column(name = "type")
    private String type;

    @Column(name = "author")
    private String author;

    @Column(name = "price")
    private Double price;

    @Column(name = "stock")
    private Integer stock;

    @Transient
    private BookDetail detail;

    public BookDetail getDetail(){ return this.detail; }

    public void setDetail(BookDetail bookDetail){ this.detail = bookDetail; }
}
