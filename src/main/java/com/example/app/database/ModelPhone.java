package com.example.app.database;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class ModelPhone {
    @Id
    private String id;

    @Field("modelPhone")
    private String modelPhone; // Поле, соответствующее вашей коллекции в MongoDB

    // Геттеры и сеттеры для modelPhone
    public String getModelPhone() {
        return modelPhone;
    }

    public void setModelPhone(String modelPhone) {
        this.modelPhone = modelPhone;
    }

    // Геттеры и сеттеры для других полей...
}

