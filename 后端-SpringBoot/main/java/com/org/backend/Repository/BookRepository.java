package com.org.backend.Repository;

import com.org.backend.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Integer> {
    @Query("select b from Book b where b.author like %?1%")
    List<Book> findBooksByAuthorLike(String name);

    @Query("select b from Book b where b.title like %?1%")
    List<Book> findBooksByTitleLike(String title);

    @Query("select b from Book b where b.isbn = :isbn")
    Book findByISBN(String isbn);
}
