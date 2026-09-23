package hattabi.youness.customer_service.projections;

import hattabi.youness.customer_service.entities.Customer;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "full", types = Customer.class)
public interface CustomerProjection {
    Long getId();
    String getName();
    String getEmail();
}