package com.AdaptMart.Service;

import com.AdaptMart.Dao.Product;
import com.AdaptMart.Dto.ProductRequest;
import com.AdaptMart.Dto.UpdateRequest;
import com.AdaptMart.Repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository productRepo;

    public ProductService(ProductRepository productRepo){
        this.productRepo=productRepo;
    }


    public boolean addProduct(ProductRequest request) {
        Product product = new Product();
        product.setProduct_Name(request.getProduct_Name());
        product.setProduct_Description(request.getProduct_Description());
        product.setProduct_Price(request.getProduct_Price());
        product.setProduct_rating(request.getProduct_rating());

        productRepo.save(product);

        return true;
    }


    public List<Product> getProducts(){
        return productRepo.findAll();
    }

    public boolean updateProduct(UpdateRequest request) {
        Optional<Product> optionalProduct = productRepo.findById(request.getProduct_Id());

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            product.setProduct_Name(request.getProduct_Name());
            product.setProduct_Description(request.getProduct_Description());
            product.setProduct_Price(request.getProduct_Price());
            product.setProduct_rating(request.getProduct_rating());

            productRepo.save(product);
            return true;
        }

        return false;
    }

}
