package com.org.backend.Util;

import com.org.backend.Entity.User;

import java.util.List;

public class userBuy {
    private User user;
    private List<bookSell> bookList;
    private double price = 0;

    public userBuy(){}

    public userBuy(User user, double price) { this.user = user; this.price = price; }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return this.user;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getPrice() {
        return this.price;
    }

    public void setBookList(List<bookSell> bookList) {
        this.bookList = bookList;
    }

    public List<bookSell> getBookList() {
        return this.bookList;
    }
}
