package dev.java.ecommerce.basketservice.Controller;

import dev.java.ecommerce.basketservice.Client.Response.PlatziProductResponse;
import dev.java.ecommerce.basketservice.Service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

    @Autowired
    private ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<PlatziProductResponse>> buscar(){
        return ResponseEntity.ok(service.buscar());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlatziProductResponse> burcarId(@PathVariable Long id){

        return ResponseEntity.ok(service.buscarId(id));
    }


}
