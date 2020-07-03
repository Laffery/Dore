package com.org.backend.Controller;

import com.org.backend.Entity.Order;
import com.org.backend.ServiceImpl.OrderServiceImpl;
import com.org.backend.Util.bookSell;
import com.org.backend.Util.userBuy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderController {
    @Autowired
    OrderServiceImpl orderService;

    @InitBinder
    public void initBinder(WebDataBinder binder, WebRequest request) {
        DateFormat format= new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        binder.registerCustomEditor(Date.class, new CustomDateEditor(format, true));
    }

    @GetMapping("/getOne")
    public Order getOne(@Param("id") Integer id) {
        return orderService.getByID(id);
    }

    @GetMapping("/getAll")
    public List<Order> getAll(){
        return orderService.getAll();
    }

    @GetMapping("/getPage")
    public List<Order> getPage(@Param("no") Integer no, @Param("size") Integer size) {
        return orderService.getPage(no, size);
    }

    @GetMapping("/getByID")
    public List<Order> getByID(@Param("id") Integer id){
        return orderService.getByUserID(id);
    }

    @GetMapping("/during")
    public List<Order> getDateDuring(@Param("start") Date start, @Param("end") Date end) {
        return orderService.During(start, end);
    }

    @GetMapping("/duringByUser")
    public List<Order> getDateDuringByUser(@Param("uid") Integer uid, @Param("start") Date start,
                                           @Param("end") Date end) {
        return orderService.userDuring(uid, start, end);
    }

    @GetMapping("/sellRank")
    public List<bookSell> sellRank(@Param("start") Date start, @Param("end") Date end){
        return orderService.sellRank(start, end);
    }

    @GetMapping("/buyRank")
    public List<userBuy> buyRank(@Param("start") Date start, @Param("end") Date end) {
        return orderService.buyRank(start, end);
    }

    @GetMapping("/bought")
    public List<bookSell> bought(@Param("id") Integer id, @Param("start") Date start, @Param("end") Date end) {
        return orderService.bought(id, start, end).getBookList();
    }

    @PostMapping("/save")
    public String save(@RequestBody Order order){
        return orderService.save(order);
    }

    @DeleteMapping("/delete")
    public void delete(@Param("id") Integer id){
        orderService.delete(id);
    }
}
