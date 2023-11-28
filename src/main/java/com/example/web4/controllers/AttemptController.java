package com.example.web4.controllers;

import com.example.web4.models.Attempt;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import com.example.web4.service.AttemptService;

import java.security.Principal;

@Controller
@RequiredArgsConstructor
public class AttemptController {
    private final AttemptService attemptService;

    @GetMapping("/")
    public String attempt(Principal principal, Model model){
        model.addAttribute("attempts", attemptService.getAttemptsByPrincipal(principal));
        model.addAttribute("user", attemptService.getUserByPrincipal(principal));
        return "attempts";
    }

    @GetMapping("/attempt/{id}")
    public String attemptInfo(@PathVariable Long id, Model model) {
        model.addAttribute("attempt", attemptService.getAttemptById(id));
        return "attempt-info";
    }

    @PostMapping("/attempt/create")
    public String createAttempt(Attempt attempt, Principal principal){
        attemptService.saveAttempt(attempt, principal);
        return "redirect:/";
    }

    @PostMapping("/attempt/delete/{id}")
    public String deleteAttempt(@PathVariable Long id) {
        attemptService.deleteAttempt(id);
        return "redirect:/";
    }

}
