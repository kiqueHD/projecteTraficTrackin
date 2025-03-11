package com.example.traffictracking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String user_name;

    @Column(nullable = false)
    private String password;

    public User() {}

    public User(String user_name, String email, String password) {
        this.email = email;
        this.user_name = user_name;
        this.password = password;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getUser_name() { return user_name; }
    public void setUser_name(String user_name) { this.user_name = user_name; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
