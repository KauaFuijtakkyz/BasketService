package dev.java.ecommerce.basketservice.Controller.request;

import dev.java.ecommerce.basketservice.Entity.PaymentMethod;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PaymentResquest {
    private PaymentMethod paymentMethod;
}
