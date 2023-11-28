package com.example.web4.controllers;

import com.example.web4.dto.AuthorizedUserCredentials;
import com.example.web4.dto.UserCredentials;
import com.example.web4.models.User;
import com.example.web4.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;



@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> loginUser(@RequestBody UserCredentials userRequest) {
        System.out.println("try login user "+userRequest.getName()+" "+userRequest.getPassword());
        try {
            AuthorizedUserCredentials credentials = userService.loginUser(userRequest);
            return ResponseEntity.ok().body(credentials);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error login user");
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserCredentials userRequest) {
        System.out.println("new user "+userRequest.getName());
        try {
            if(!userService.createUser(userRequest)){
                throw new RuntimeException();
            }
            return ResponseEntity.ok().body("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error registering user");
        }
    }
}
