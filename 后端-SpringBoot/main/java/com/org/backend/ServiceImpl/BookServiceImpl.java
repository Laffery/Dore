package com.org.backend.ServiceImpl;

import com.org.backend.DaoImpl.BookDaoImpl;
import com.org.backend.Entity.Book;
import com.org.backend.Service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class BookServiceImpl implements BookService{
    @Autowired
    BookDaoImpl bookDao;

    @Override
    public Book getByID(Integer id){
        return bookDao.getOne(id);
    }

    @Override
    public List<Book> getAll(){
        return bookDao.getAll();
    }

    @Override
    public List<Book> getPage(Integer index, Integer size) {
        return bookDao.getPage(index - 1, size);
    }

    @Override
    public List<Book> searchAuthor(String author) {
        return bookDao.getAuthorLike(author);
    }

    @Override
    public List<Book> searchTitle(String title) {
        return bookDao.getTitleLike(title);
    }

    Comparator<Book> comparator = new Comparator<Book>() {
        @Override
        public int compare(Book o1, Book o2) {
            if (o1.getID() > o2.getID())
                return 1;
            else if(o1.getID() < o2.getID())
                return -1;
            return 0;
        }
    };

    @Override
    public List<Book> search(String value) {
        List<Book> likeAuthor = bookDao.getAuthorLike(value);
        List<Book> likeTitle = bookDao.getTitleLike(value);
        likeTitle.addAll(likeAuthor);
        likeTitle.sort(comparator);
        return likeTitle;
    }

    @Override
    public String save(Book book){
        return bookDao.save(book);
    }

    @Override
    public String update(Book book){
        return bookDao.update(book);
    }

    @Override
    public String delete(Integer id){
        return bookDao.delete(id);
    }
}
