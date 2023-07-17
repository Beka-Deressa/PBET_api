package com.pbet.controller;

import com.pbet.service.ShopItemService;
import com.pbet.entities.ShopItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


import java.util.ArrayList;
import java.util.List;


@Controller
@RequestMapping("/shopitem")
public class ViewController {
    private final ShopItemService shopItemService;

    @Autowired
    public ViewController(ShopItemService shopItemService) {
        this.shopItemService = shopItemService;
    }


    @GetMapping("/index")
    public String index() {
        return "index";

    }
    @GetMapping("/about")
    public String about() {
        return "about";

    }
    @GetMapping("/register")
    public String register() {
        return "register";

    }

    @GetMapping("/admin")
    public String admin() {
        return "admin";
    }


    @GetMapping("/items")
    public ResponseEntity<ShopItem[]> getAllItems() {
        Iterable<ShopItem> shopItemsIterable = shopItemService.getAllItem();
        List<ShopItem> shopItemsList = new ArrayList<>();
        shopItemsIterable.forEach(shopItemsList::add);
        ShopItem[] shopItemsArray = shopItemsList.toArray(new ShopItem[0]);
        return ResponseEntity.ok().body(shopItemsArray);
    }
}



