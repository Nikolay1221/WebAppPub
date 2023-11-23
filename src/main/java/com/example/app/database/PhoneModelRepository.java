package com.example.app.database;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface PhoneModelRepository extends MongoRepository<ModelPhone, String> {
    // Поиск по вхождению подстроки в modelPhone
    @Query("{ 'modelPhone' : { $regex: ?0, $options: 'i' } }")
    List<ModelPhone> findByModelPhoneContaining(String modelPhone);
}

