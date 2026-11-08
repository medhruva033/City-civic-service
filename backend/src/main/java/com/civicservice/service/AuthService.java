
package com.civicservice.service;

import com.civicservice.dto.request.LoginRequest;
import com.civicservice.dto.request.RegisterRequest;
import com.civicservice.dto.response.AuthResponse;
import com.civicservice.dto.response.LoginResponse;
import com.civicservice.entity.User;
import com.civicservice.entity.UserRole;
import com.civicservice.repository.UserRepository;
import com.civicservice.security.JwtService;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // CITIZEN REGISTRATION
    @Transactional
    public AuthResponse register(RegisterRequest request) {

        String email = request.getEmail().trim().toLowerCase();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(
                    "Email is already registered"
            );
        }

        User user = new User();

        user.setFullName(request.getFullName().trim());
        user.setEmail(email);

        user.setPasswordHash(
                passwordEncoder.encode(request.getPassword())
        );

        user.setPhone(request.getPhone());

        // Public registration always creates CITIZEN.
        user.setRole(UserRole.CITIZEN);
        user.setActive(true);

        User savedUser = userRepository.save(user);

        return new AuthResponse(
                savedUser.getId(),
                savedUser.getFullName(),
                savedUser.getEmail(),
                savedUser.getRole().name(),
                "Registration successful"
        );
    }

    // USER LOGIN WITH JWT
    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {

        String email = request.getEmail()
                .trim()
                .toLowerCase();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid email or password"
                ));

        // Check account status
        if (!Boolean.TRUE.equals(user.getActive())) {
            throw new IllegalArgumentException(
                    "Your account is inactive"
            );
        }

        // Verify password using BCrypt
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPasswordHash())) {

            throw new IllegalArgumentException(
                    "Invalid email or password"
            );
        }

        // Generate JWT token
        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new LoginResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                token,
                "Login successful"
        );
    }

    // GET CURRENTLY AUTHENTICATED USER
    @Transactional(readOnly = true)
    public AuthResponse getCurrentUser(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"
                ));

        // Check account status
        if (!Boolean.TRUE.equals(user.getActive())) {
            throw new IllegalArgumentException(
                    "Your account is inactive"
            );
        }

        return new AuthResponse(
                user.getId(),
                user.getFullName(),
                user.getEmail(),
                user.getRole().name(),
                "User profile retrieved successfully"
        );
    }
}
