package com.spring; // Asegúrate de que este paquete contiene el controlador

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.spring") // <-- Asegúrate de que Spring escanee este paquete
public class TraficTrackinApplication {
    public static void main(String[] args) {
        SpringApplication.run(TraficTrackinApplication.class, args);
    }
}
