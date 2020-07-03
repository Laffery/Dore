package com.org.backend.Repository;

import com.org.backend.Entity.BookDetail;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookDetailRepository extends MongoRepository<BookDetail, Integer> {

}
