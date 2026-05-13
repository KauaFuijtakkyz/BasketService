package dev.java.ecommerce.basketservice.Controller.request;

import java.util.List;

public record BasketRequest(
        Long clientId,
        List<ProductRequest> product
) {
}
