package com.org.backend.Controller;

import com.org.backend.Entity.Book;
import com.org.backend.ServiceImpl.BookServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/book")
public class BookController {
    @Autowired
    private BookServiceImpl bookService;

    @GetMapping("/getAll")
    public List<Book> getAll(){
        return bookService.getAll();
    }

    @GetMapping("/getByID")
    public Book getById(@RequestParam("id") Integer id){
        return bookService.getByID(id);
    }

    @GetMapping("/getPage")
    public List<Book> getPage(@RequestParam("index") Integer index, @RequestParam("size") Integer size) {
        return bookService.getPage(index, size);
    }

    @GetMapping("/search")
    public List<Book> search(@RequestParam("value") String value) {
        return bookService.search(value);
    }

    @GetMapping("/searchAuth")
    public List<Book> searchAuthor(@RequestParam("auth") String auth) {
        return bookService.searchAuthor(auth);
    }

    @GetMapping("/searchTitle")
    public List<Book> searchTitle(@RequestParam("title") String title) {
        return bookService.searchTitle(title);
    }

    @PostMapping("/saveBook")
    public String save(@RequestBody Book book){
        return bookService.save(book);
    }

    @PutMapping("/updateBook")
    public String update(@RequestBody Book book){
        return bookService.update(book);
    }

    @DeleteMapping("/deleteBook")
    public String delete(@RequestParam("id") Integer id){
        return bookService.delete(id);
    }
}
