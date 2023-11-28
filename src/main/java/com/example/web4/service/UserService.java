package com.example.web4.service;

import com.example.web4.dto.AuthorizedUserCredentials;
import com.example.web4.dto.UserCredentials;
import com.example.web4.models.User;
import com.example.web4.models.enums.Role;
import com.example.web4.repositories.UserRepository;
import com.example.web4.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
    private final PasswordEncoder encoder;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public boolean createUser(UserCredentials userCredentials){
        if(userRepository.findByName(userCredentials.getName()).isPresent()) return false;
        User user = new User(userCredentials.encoded(encoder));
        user.setPassword(passwordEncoder.encode(userCredentials.getPassword()));
        log.info("Saving new user with email: {}", user.getEmail());
        userRepository.save(user);
        return true;
    }
    public boolean findUser(UserCredentials userCredentials){
        User user = new User(userCredentials.encoded(encoder));
        if(userRepository.findByEmail(user.getName())==null) return false;
        if(!passwordEncoder.encode(user.getPassword()).equals(userRepository.findByEmail(user.getName()).getPassword())) return false;
        System.out.println("Login user with email:" + user.getName());
        return true;
    }
    public AuthorizedUserCredentials loginUser(UserCredentials userCredentials) {
        System.out.println("met1");
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(userCredentials.getName(), userCredentials.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtToken = jwtUtils.generateJwtToken(userCredentials.getName());
        System.out.println(jwtUtils.validateJwtToken(jwtToken));

        return new AuthorizedUserCredentials(userCredentials.getName(), jwtToken);
    }
}
