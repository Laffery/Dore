package com.org.backend.DaoImpl;

import com.org.backend.Entity.Book;
import com.org.backend.Dao.BookDao;
import com.org.backend.Entity.BookDetail;
import com.org.backend.Repository.BookDetailRepository;
import com.org.backend.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
public class BookDaoImpl implements BookDao{
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookDetailRepository bookDetailRepository;

    @Override
    public Book getOne(Integer id){
        Book book = bookRepository.getOne(id);
        Optional<BookDetail> bookDetail = bookDetailRepository.findById(id);
        if(bookDetail.isPresent())
            book.setDetail(bookDetail.get());
        else
            book.setDetail(null);

        return book;
    }

    public List<Book> implBooks(List<Book> books) {
        List<Book> res = new ArrayList<>();

        for (Book book : books){
            res.add(getOne(book.getID()));
        }

        return res;
    }

    @Override
    public List<Book> getAll() {
        List<Book> books = bookRepository.findAll();
        return implBooks(books);
    }

    @Override
    public List<Book> getPage(Integer index, Integer size) {
        Page<Book> page = bookRepository.findAll((Pageable)PageRequest.of(index, size));
        List<Book> books = page.toList();
        return implBooks(books);
    }

    @Override
    public List<Book> getAuthorLike(String name) {
        return implBooks(bookRepository.findBooksByAuthorLike(name));
    }

    @Override
    public List<Book> getTitleLike(String title) {
        return implBooks(bookRepository.findBooksByTitleLike(title));
    }

    @Override
    public String save(Book book){
        if (bookRepository.findByISBN(book.getIsbn()) != null) {
            return "error";
        }
        bookRepository.save(book);
        Book res = bookRepository.findByISBN(book.getIsbn());
        BookDetail bookDetail = book.getDetail();
        bookDetail.setId(res.getID());
        bookDetailRepository.save(bookDetail);
        return "success";
    }

    @Override
    public String update(Book book){
        Book res = bookRepository.findByISBN(book.getIsbn());
        if (res != null && !Objects.equals(res.getID(), book.getID())) {
            return "error";
        }
        bookRepository.save(book);
        BookDetail bookDetail = book.getDetail();
        bookDetail.setId(book.getID());
        bookDetailRepository.save(bookDetail);
        return "success";
    }

    @Override
    public String delete(Integer id){
        if (!bookRepository.findById(id).isPresent()) {
            return "error";
        }
        bookRepository.deleteById(id);
        bookDetailRepository.deleteById(id);
        return "success";
    }
}
