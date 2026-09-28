package hattabi.youness.billing_service;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import hattabi.youness.billing_service.entities.Bill;
import hattabi.youness.billing_service.entities.ProductItem;
import hattabi.youness.billing_service.feign.CustomerRestClient;
import hattabi.youness.billing_service.feign.ProductRestClient;
import hattabi.youness.billing_service.model.Customer;
import hattabi.youness.billing_service.model.Product;
import hattabi.youness.billing_service.repositories.BillRepository;
import hattabi.youness.billing_service.repositories.ProductItemRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.Random;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(BillingServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner commandLineRunner(
			BillRepository billRepository,
			ProductItemRepository productItemRepository,
			CustomerRestClient customerRestClient,
			ProductRestClient productRestClient) {

		return args -> {
			Collection<Customer> customers = customerRestClient.getAllCustomers().getContent();
			Collection<Product> products = productRestClient.getAllProducts().getContent();

			customers.forEach(customer -> {
				Bill bill = Bill.builder()
						.billingDate(LocalDate.now())
						.customerId(customer.getId())
						.build();
				billRepository.save(bill);

				products.forEach(product -> {
					ProductItem item = ProductItem.builder()
							.bill(bill)
							.productId(product.getId())
							.quantity(1 + new Random().nextInt(5))
							.unitPrice(product.getPrice())
							.build();
					productItemRepository.save(item);
				});
			});
		};
	}
}
