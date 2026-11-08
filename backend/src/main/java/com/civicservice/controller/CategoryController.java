
package com.civicservice.controller;

import com.civicservice.entity.Category;
import com.civicservice.service.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        return ResponseEntity.ok(categoryService.getActiveCategories());
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(
            @RequestBody Map<String, String> request) {

        Category category = categoryService.createCategory(
                request.get("name"),
                request.get("description")
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(category);
    }
}
