package com.org.backend.Dao;

import com.org.backend.Entity.Book;
import java.util.List;

public interface BookDao {
    Book getOne(Integer id);

    List<Book> getAll();

    List<Book> getPage(Integer index, Integer size);

    List<Book> getAuthorLike(String name);

    List<Book> getTitleLike(String title);

    String save(Book book);

    String update(Book book);

    String delete(Integer id);
}
