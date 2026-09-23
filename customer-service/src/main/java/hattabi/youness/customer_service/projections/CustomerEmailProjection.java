package hattabi.youness.customer_service.projections;

import hattabi.youness.customer_service.entities.Customer;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "email", types = Customer.class)
public interface CustomerEmailProjection {
    String getEmail();
}
