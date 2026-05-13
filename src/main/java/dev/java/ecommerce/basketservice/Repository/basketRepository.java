package dev.java.ecommerce.basketservice.Repository;

import dev.java.ecommerce.basketservice.Entity.Basket;
import dev.java.ecommerce.basketservice.Entity.Status;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface basketRepository extends MongoRepository<Basket, String> {

    // No seu basketRepository
    Optional<Basket> findByClientAndStatus(Long client, Status status);


}
