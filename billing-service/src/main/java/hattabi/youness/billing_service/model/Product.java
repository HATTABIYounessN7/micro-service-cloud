package hattabi.youness.billing_service.model;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private String id;
    private String name;
    private double price;
    private int quantity;
}
