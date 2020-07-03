package com.org.backend.Service;

import com.org.backend.Entity.Book;

import java.util.List;

public interface BookService {
    Book getByID(Integer id);

    List<Book> getAll();

    List<Book> getPage(Integer index, Integer size);

    List<Book> searchAuthor(String author);

    List<Book> searchTitle(String title);

    List<Book> search(String value);

    String save(Book book);

    String update(Book book);

    String delete(Integer id);
}
