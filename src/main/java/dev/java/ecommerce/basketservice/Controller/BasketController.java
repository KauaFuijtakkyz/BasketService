package dev.java.ecommerce.basketservice.Controller;

import dev.java.ecommerce.basketservice.Controller.request.BasketRequest;
import dev.java.ecommerce.basketservice.Controller.request.PaymentResquest;
import dev.java.ecommerce.basketservice.Entity.Basket;
import dev.java.ecommerce.basketservice.Service.BasketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/basket")
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
public class BasketController {

    private final BasketService service;

    @GetMapping("/{id}")
    public ResponseEntity<Basket>buscarCarrinho(@PathVariable String id){
            return ResponseEntity.ok(service.getBasketById(id));

    }

    @PostMapping
    public ResponseEntity<Basket> createBasket(@RequestBody BasketRequest request){
        return ResponseEntity.status(HttpStatus.CREATED).body(service.creatBasket(request));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Basket> createBasket(@PathVariable String id,@RequestBody BasketRequest request){
        return ResponseEntity.status(HttpStatus.OK).body(service.updateBasket(id,   request));
    }
    @PutMapping("/{id}/payment")
    public ResponseEntity<Basket> paymantBasket(@PathVariable String id,@RequestBody PaymentResquest request){
        return ResponseEntity.status(HttpStatus.OK).body(service.payBasket(id,request));
    }

    @DeleteMapping("/{id}/delete") // Note que aqui é DeleteMapping
    public ResponseEntity<Void> deleteBasket(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
