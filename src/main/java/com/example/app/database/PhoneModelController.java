package com.example.app.database;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/phones")
public class PhoneModelController {

    @Autowired
    private PhoneModelRepository phoneModelRepository;

    // Поиск моделей телефонов по вхождению подстроки в modelPhone
    @GetMapping("/search")
    public List<ModelPhone> searchPhoneModels(@RequestParam String modelPhone) {
        return phoneModelRepository.findByModelPhoneContaining(modelPhone);
    }
}

