package com.org.backend.Controller;

import com.org.backend.Entity.Cart;
import com.org.backend.Repository.CartRepository;
import com.org.backend.ServiceImpl.CartServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    @Autowired
    CartServiceImpl cartService;

    @GetMapping("/getByUid")
    public List<Cart> getCartsByUid(@RequestParam("uid") Integer uid){
        return cartService.getByUserID(uid);
    }

    @GetMapping("/getByName")
    public List<Cart> getCartsByName(@RequestParam("name") String name){
        return cartService.getByUserName(name);
    }

    @PostMapping("/save")
    public void saveCart(@RequestBody Cart cart){
        cartService.save(cart);
    }

    @PostMapping("/update")
    public void update(@RequestBody Cart cart){
        cartService.update(cart);
    }

    @DeleteMapping("/delete")
    public void deleteCart(@RequestParam("id") Integer id){
        cartService.delete(id);
    }
}
