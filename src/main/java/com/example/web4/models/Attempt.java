package com.example.web4.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "attempts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attempt {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;
    @Column(name = "x")
    private Double x;
    @Column(name = "y")
    private Double y;
    @Column(name = "r")
    private Double r;
    @Column(name = "hit")
    private Integer hit;
    @ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    @JoinColumn
    private User user;
}
