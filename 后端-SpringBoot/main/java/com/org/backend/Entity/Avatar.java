package com.org.backend.Entity;

import org.bson.types.ObjectId;
import org.hibernate.annotations.Proxy;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "avatar")
@Proxy(lazy = false)
public class Avatar {
    @Id
    private Integer id;
    private String iconBase64;

    public Avatar(){}

    public Avatar(Integer id, String iconBase64) {
        this.id = id;
        this.iconBase64 = iconBase64;
    }

    public String getIconBase64() { return iconBase64; }

    public void setIconBase64(String iconBase64) { this.iconBase64 = iconBase64; }
}
