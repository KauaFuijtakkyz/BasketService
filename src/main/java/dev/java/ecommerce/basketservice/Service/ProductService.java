package dev.java.ecommerce.basketservice.Service;


import dev.java.ecommerce.basketservice.Client.PlatiziStoreClient;
import dev.java.ecommerce.basketservice.Client.Response.PlatziProductResponse;
import lombok.Getter;
import lombok.Setter;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.w3c.dom.stylesheets.LinkStyle;

import javax.xml.transform.sax.SAXResult;
import java.util.List;
@Getter
@Setter
@Service
public class ProductService {

    private final PlatiziStoreClient platziStoreClient;


    public ProductService(PlatiziStoreClient platziStoreClient) {
        this.platziStoreClient = platziStoreClient;
    }

    @Cacheable(value = "products")
    public List<PlatziProductResponse> buscar(){

        return platziStoreClient.buscar();
    }

    @Cacheable(value = "products", key = "#id",condition = "#id != null")
    public PlatziProductResponse buscarId(Long id){
        if (id == null) {
            throw new IllegalArgumentException("O ID do produto não pode ser nulo");
        }
        return platziStoreClient.burcarId(id);
    }

}
