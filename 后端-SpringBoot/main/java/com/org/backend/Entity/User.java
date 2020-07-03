package com.org.backend.Entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.hibernate.annotations.Proxy;
import org.springframework.context.annotation.Lazy;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;

@Entity
@Data
@Table(name = "users", schema = "dorebookstore")
//@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
//@JsonIdentityInfo(
//        generator = ObjectIdGenerators.PropertyGenerator.class,
//        property = "ID")
//@Lazy(value = false)
@Proxy(lazy = false)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer ID;

    @Column(name = "name")
    private String name;

    @Column(name = "role")
    private String role;

    @Column(name = "password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "permission")
    private Integer permission;

    @Transient
    private Avatar avatar;
    public Avatar getAvatar(){ return this.avatar; }

    public void setAvatar(Avatar avatar) { this.avatar = avatar; }
}
