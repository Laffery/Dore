package com.org.backend.Util;


import com.org.backend.Entity.Book;

public class bookSell {
    private Book book;
    private int sold = 0;

    public bookSell(){}

    public bookSell(Book book, int sold) { this.book = book; this.sold = sold; }

    public Book getBook() { return this.book; };
    public void setBid(Book book) { this.book = book; }
    public int getSold() { return this.sold; }
    public void setSold(int sold) { this.sold = sold; }
}
