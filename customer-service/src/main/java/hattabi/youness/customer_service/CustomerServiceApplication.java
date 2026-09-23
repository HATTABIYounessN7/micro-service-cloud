package hattabi.youness.customer_service;

import hattabi.youness.customer_service.config.CustomerConfigParams;
import hattabi.youness.customer_service.entities.Customer;
import hattabi.youness.customer_service.repositories.CustomerRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
@EnableConfigurationProperties(CustomerConfigParams.class)
public class CustomerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(CustomerServiceApplication.class, args);
	}

	@Bean
    CommandLineRunner commandLineRunner(CustomerRepository customerRepository) {
        return args -> {
            List.of(
                Customer.builder().name("John").email("john@gmail.com").build(),
                Customer.builder().name("Jane").email("jane@gmail.com").build(),
                Customer.builder().name("Jessica").email("jessi@gmail.com").build()
            ).forEach(customerRepository::save);
        };
    }
}
