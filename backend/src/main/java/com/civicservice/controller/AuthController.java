
package com.civicservice.controller;

import com.civicservice.dto.request.LoginRequest;
import com.civicservice.dto.request.RegisterRequest;
import com.civicservice.dto.response.AuthResponse;
import com.civicservice.dto.response.LoginResponse;
import com.civicservice.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // CITIZEN REGISTRATION
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        AuthResponse response = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // USER LOGIN
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody LoginRequest request) {

        LoginResponse response = authService.login(request);

        return ResponseEntity.ok(response);
    }

    // GET CURRENT AUTHENTICATED USER
    @GetMapping("/me")
    public ResponseEntity<AuthResponse> getCurrentUser(
            Authentication authentication) {

        AuthResponse response =
                authService.getCurrentUser(authentication.getName());

        return ResponseEntity.ok(response);
    }
}
