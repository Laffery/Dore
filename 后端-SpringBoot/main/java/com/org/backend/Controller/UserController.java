package com.org.backend.Controller;

import com.org.backend.Entity.User;
import com.org.backend.ServiceImpl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/getAll")
    public List<User> getAll(){
        return userService.getAll();
    }

    @GetMapping("/getPage")
    public List<User> getPage(@RequestParam("no") Integer no, @RequestParam("size") Integer size) {
        return userService.getPage(no, size);
    }

    @GetMapping("/getByID")
    public User getByID(@RequestParam("id") Integer id){
        return userService.getByID(id);
    }

    @GetMapping("/getByName")
    public User getByName(@RequestParam("name") String name){
        return userService.getByName(name);
    }

    @GetMapping("/getAvatar")
    public String getAvatar(@RequestParam("name") String name) {
        return userService.getByName(name).getAvatar().getIconBase64();
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        User tmp = userService.getByName(user.getName());
        User res = new User();
        if (tmp == null){
            res.setID(0);
        }
        else if (!user.getPassword().equals(tmp.getPassword())){
            res.setID(-1);
        }
        else if (tmp.getPermission() == 0){
            res.setID(-2);
        }
        else {
            res.setID(tmp.getID());
            res.setName(tmp.getName());
            res.setRole(tmp.getRole());
            res.setAvatar(tmp.getAvatar());
        }

        return res;
    }

    @PostMapping("/permission")
    public String permission(@RequestBody User user) {
        if(user.getRole().equals("admin"))
            return "error";

        User tmp = userService.getByName(user.getName());
        tmp.setPermission(user.getPermission());
        return userService.update(tmp);
    }

    @PostMapping("/save")
    public String save(@RequestBody User user) {
        return userService.save(user);
    }

    @PostMapping("/update")
    public String update(@RequestBody User user){
        return userService.update(user);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id") Integer id){
        userService.delete(id);
    }
}
