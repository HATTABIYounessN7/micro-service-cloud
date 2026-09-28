package hattabi.youness.billing_service.web;

import hattabi.youness.billing_service.entities.Bill;
import hattabi.youness.billing_service.feign.CustomerRestClient;
import hattabi.youness.billing_service.feign.ProductRestClient;
import hattabi.youness.billing_service.repositories.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class BillRestController {

    private final BillRepository billRepository;
    private final CustomerRestClient customerRestClient;
    private final ProductRestClient productRestClient;

    @GetMapping("/bills")
    public List<Bill> getAllBills() {
        List<Bill> bills = billRepository.findAll();
        bills.forEach(bill -> {
            bill.setCustomer(customerRestClient.getCustomerById(bill.getCustomerId()));
            bill.getProductItems()
                    .forEach(item -> item.setProduct(productRestClient.getProductById(item.getProductId())));
        });
        return bills;
    }

    @GetMapping("/bills/{id}")
    public Bill getBillById(@PathVariable Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found: " + id));

        bill.setCustomer(customerRestClient.getCustomerById(bill.getCustomerId()));

        bill.getProductItems().forEach(item -> item.setProduct(productRestClient.getProductById(item.getProductId())));

        return bill;
    }
}
