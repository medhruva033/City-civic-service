
package com.civicservice.service;

import com.civicservice.entity.Category;
import com.civicservice.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getActiveCategories() {
        return categoryRepository.findByActiveTrueOrderByNameAsc();
    }

    public Category createCategory(String name, String description) {

        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Category name is required");
        }

        String cleanName = name.trim();

        if (categoryRepository.existsByNameIgnoreCase(cleanName)) {
            throw new IllegalArgumentException("Category already exists");
        }

        Category category = new Category();
        category.setName(cleanName);
        category.setDescription(description);

        return categoryRepository.save(category);
    }
}
