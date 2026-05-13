package dev.java.ecommerce.basketservice.Service;
import java.util.Optional;

import dev.java.ecommerce.basketservice.Client.Response.PlatziProductResponse;
import dev.java.ecommerce.basketservice.Controller.request.BasketRequest;
import dev.java.ecommerce.basketservice.Controller.request.PaymentResquest;
import dev.java.ecommerce.basketservice.Controller.request.ProductRequest;
import dev.java.ecommerce.basketservice.Entity.Basket;
import dev.java.ecommerce.basketservice.Entity.PaymentMethod;
import dev.java.ecommerce.basketservice.Entity.Product;
import dev.java.ecommerce.basketservice.Entity.Status;
import dev.java.ecommerce.basketservice.Repository.basketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BasketService {
    @Autowired
    private final basketRepository repository;

    private final ProductService service;

    public Basket getBasketById(String id){
        return repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("carrinho nn exisite"));
    }

    public Basket creatBasket(BasketRequest resquest) {
        // 1. Verifica se já existe um carrinho aberto para o cliente
        Optional<Basket> existingBasket = repository.findByClientAndStatus(resquest.clientId(), Status.OPEN);

        // 2. Se o carrinho já existir, redireciona o fluxo para a atualização (método updateBasket)
        if (existingBasket.isPresent()) {
            return updateBasket(existingBasket.get().getId(), resquest);
        }

        // 3. Se não existir, mantém a lógica original de criação do zero
        List<Product> productList = new ArrayList<>();
        resquest.product().forEach(productRequest -> {
            PlatziProductResponse platziProductResponse = service.buscarId(productRequest.id());

            productList.add(Product.builder()
                    .id(platziProductResponse.id())
                    .title(platziProductResponse.title())
                    .price(platziProductResponse.price())
                    .quantity(productRequest.quantity())
                    .build());
        });

        Basket basket = Basket.builder()
                .client(resquest.clientId())
                .status(Status.OPEN)
                .product(productList)
                .build();

        basket.calculateTotalPrice();
        return repository.save(basket);
    }

    public Basket updateBasket(String id,BasketRequest request) {
        Basket basket = getBasketById(id);
        List<Product> getProduct = new ArrayList<>();
        request.product().forEach(productRequest -> {
            PlatziProductResponse platziProductResponse = service.buscarId(request.clientId());
            getProduct.add(Product.builder()
                    .id(platziProductResponse.id())
                    .title(platziProductResponse.title())
                    .price(platziProductResponse.price())
                    .quantity(productRequest.quantity())
                    .build());
        });

        basket.setProduct(getProduct);
        basket.calculateTotalPrice();
        return repository.save(basket);
    }

    public Basket payBasket(String id, PaymentResquest resquest){
        Basket basket = getBasketById(id);
        basket.setPaymentMethod(resquest.getPaymentMethod());
        basket.setStatus(Status.SOLD);

        // Teste temporário:

        return repository.save(basket);

    }

    public void deleteById(String id) {

        repository.deleteById(id);
    }
}
