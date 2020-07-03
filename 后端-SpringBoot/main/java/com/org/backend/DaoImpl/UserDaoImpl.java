package com.org.backend.DaoImpl;

import com.org.backend.Entity.Avatar;
import com.org.backend.Entity.User;
import com.org.backend.Dao.UserDao;
import com.org.backend.Repository.AvatarRepository;
import com.org.backend.Repository.UserRepository;
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
public class UserDaoImpl implements UserDao{
    @Autowired
    UserRepository userRepository;
    @Autowired
    AvatarRepository avatarRepository;

    public User implUser(User user){
        Integer id = user.getID();
        Optional<Avatar> avatar = avatarRepository.findById(id);

        if(avatar.isPresent())
            user.setAvatar(avatar.get());
        else
            user.setAvatar(null);

        return user;
    }

    @Override
    public User getOne(Integer id) {
        User user = userRepository.getUserByID(id);

        return (user == null) ? null : implUser(user);
    }

    @Override
    public User getByName(String name){
        User user = userRepository.getUserByName(name);

        return (user == null) ? null : implUser(user);
    }

    public List<User> implUsers(List<User> users) {
        List<User> res = new ArrayList<>();
        for (User user : users) {
            res.add(implUser(user));
        }

        return res;
    }

    @Override
    public List<User> getAll() {
        List<User> users = userRepository.findAll();
        return implUsers(users);
    }

    @Override
    public List<User> getPage(Integer no, Integer size) {
        Page<User> page = userRepository.findAll((Pageable) PageRequest.of(no, size));
        List<User> users = page.toList();
        return implUsers(users);
    }

    @Override
    public void save(User user){
        userRepository.save(user);
        User res = userRepository.getUserByName(user.getName());
        assert res != null;
        Avatar avatar = new Avatar(res.getID(), user.getAvatar().getIconBase64());
        avatarRepository.save(avatar);
    }

    @Override
    public void update(User user){
        save(user);
    }

    @Override
    public void delete(Integer id){
        userRepository.deleteById(id);
        avatarRepository.deleteById(id);
    }
}
