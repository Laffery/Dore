package com.org.backend.Entity;

import org.hibernate.annotations.Proxy;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Document(collection = "bookDetails")
@Proxy(lazy = false)
public class BookDetail {
    @Id
    private Integer id;
    private String iconBase64;
    private String description;

    public BookDetail() {}

    public BookDetail(Integer id, String iconBase64, String description) {
        this.id = id;
        this.iconBase64 = iconBase64;
        this.description = description;
    }

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    public String getIconBase64() { return iconBase64; }

    public void setIconBase64(String iconBase64) { this.iconBase64 = iconBase64; }

    public String getDescription() { return this.description; }

    public void setDescription(String description) { this.description = description; }
}
