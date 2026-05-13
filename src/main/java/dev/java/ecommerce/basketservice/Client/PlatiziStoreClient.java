package dev.java.ecommerce.basketservice.Client;

import dev.java.ecommerce.basketservice.Client.Response.PlatziProductResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;


@FeignClient(name = "PlatiziStoreClient", url = "${basket.client.platzi}")
public interface PlatiziStoreClient {



    @GetMapping("/products")
    List<PlatziProductResponse> buscar();

    @GetMapping("/products/{id}")
    PlatziProductResponse burcarId(@PathVariable Long id);

}
