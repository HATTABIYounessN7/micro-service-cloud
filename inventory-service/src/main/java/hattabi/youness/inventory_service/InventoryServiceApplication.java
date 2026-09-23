package hattabi.youness.inventory_service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import hattabi.youness.inventory_service.entities.Product;
import hattabi.youness.inventory_service.repositories.ProductRepository;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class InventoryServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InventoryServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(ProductRepository productRepository) {
		return args -> {
			List.of(
					Product.builder()
							.id(UUID.randomUUID().toString())
							.name("Laptop")
							.price(12000.0)
							.quantity(10)
							.build(),
					Product.builder()
							.id(UUID.randomUUID().toString())
							.name("Printer")
							.price(3500.0)
							.quantity(5)
							.build(),
					Product.builder()
							.id(UUID.randomUUID().toString())
							.name("Smart Phone")
							.price(8500.0)
							.quantity(20)
							.build())
					.forEach(productRepository::save);
		};
	}
}
