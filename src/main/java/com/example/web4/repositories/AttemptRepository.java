package com.example.web4.repositories;

import com.example.web4.models.Attempt;
import com.example.web4.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AttemptRepository extends JpaRepository<Attempt, Long> {
    List<Attempt> findByUser(User user);
}
