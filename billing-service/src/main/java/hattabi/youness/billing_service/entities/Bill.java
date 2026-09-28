package hattabi.youness.billing_service.entities;

import jakarta.persistence.*;
import lombok.*;
import hattabi.youness.billing_service.model.Customer;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate billingDate;

    private Long customerId;

    @OneToMany(mappedBy = "bill", fetch = FetchType.EAGER)
    private List<ProductItem> productItems = new ArrayList<>();

    @Transient
    private Customer customer;
}
