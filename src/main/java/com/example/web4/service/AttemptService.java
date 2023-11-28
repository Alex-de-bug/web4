package com.example.web4.service;

import com.example.web4.models.Attempt;
import com.example.web4.models.User;
import com.example.web4.repositories.AttemptRepository;
import com.example.web4.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttemptService {
    private final AttemptRepository attemptRepository;
    private final UserRepository userRepository;

    public List<Attempt> listAttempt(Long id) {
//        if(id!=null) return Collections.singletonList(attemptRepository.findById(id).orElse(null));
        return attemptRepository.findAll();
    }

    public void saveAttempt(Attempt attempt, Principal principal) {
        attempt.setUser(getUserByPrincipal(principal));
        //log.info("Saving new {}", attempt);
        attemptRepository.save(attempt);
    }

    public User getUserByPrincipal(Principal principal) {
        if (principal == null) return new User();
        return userRepository.findByEmail(principal.getName());
    }

    public List<Attempt> getAttemptsByPrincipal(Principal principal) {
        User user = getUserByPrincipal(principal);
        return attemptRepository.findByUser(user);
    }

    public void deleteAttempt(Long id) {
        //log.info("Delete {}", id);
        attemptRepository.deleteById(id);
    }

    public Attempt getAttemptById(Long id) {
        return attemptRepository.findById(id).orElse(null);
    }
}
