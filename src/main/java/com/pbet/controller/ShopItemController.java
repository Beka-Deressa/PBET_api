package com.pbet.controller;

import com.pbet.entities.ShopItem;
import com.pbet.service.ShopItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.HashMap;

@RestController
@RequestMapping("/shopitem")
public class ShopItemController {

        private final ShopItemService shopItemService;

        @Autowired
        public ShopItemController(ShopItemService shopItemService) {
            this.shopItemService = shopItemService;
        }

    @GetMapping("/")
    public ResponseEntity<Iterable<ShopItem>> getAllItem(){
        Iterable<ShopItem> shopItems = shopItemService.getAllItem();
        return ResponseEntity.ok().body(shopItems);
    }
    @GetMapping("/{id}")
    public ResponseEntity<ShopItem> getItemById(@PathVariable Integer id){
        ShopItem shopItems = shopItemService.getItemById(id);
        return ResponseEntity.ok().body(shopItems);
    }
    @PostMapping("/add")
    public ResponseEntity<ShopItem> addItem(@RequestBody ShopItem shopItem) {
        ShopItem savedShopItem = shopItemService.addItem(shopItem);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedShopItem.getId())
                .toUri();

        return ResponseEntity.created(location).body(savedShopItem);
    }
    @PutMapping("/{id}")
    public ResponseEntity<ShopItem> updateItem(@PathVariable Integer id, @RequestBody ShopItem updatedShopItem) {
        ShopItem updated = shopItemService.updateItem(id, updatedShopItem);
        return ResponseEntity.ok(updatedShopItem);
    }

    @ResponseStatus(HttpStatus.OK)
    @DeleteMapping("/{id}")
    public ResponseEntity<HashMap<String, Object>> deleteItem(@PathVariable Integer id) {
        HashMap<String, Object> response = shopItemService.deleteItem(id);
        return ResponseEntity.ok(response);
    }
}
