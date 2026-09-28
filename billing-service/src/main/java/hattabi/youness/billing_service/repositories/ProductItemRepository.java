package hattabi.youness.billing_service.repositories;

import hattabi.youness.billing_service.entities.ProductItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
}
