package dev.java.ecommerce.basketservice.Client.Response;

import java.io.Serializable;
import java.math.BigDecimal;

public record PlatziProductResponse(Long id, String title, BigDecimal price) implements Serializable{
}
