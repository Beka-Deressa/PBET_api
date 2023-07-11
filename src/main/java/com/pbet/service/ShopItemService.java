package com.pbet.service;

import com.pbet.entities.ShopItem;
import com.pbet.repository.ShopItemRepository;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Optional;
@Service
public class ShopItemService {

    private final ShopItemRepository shopItemRepository;

    public ShopItemService(ShopItemRepository shopItemRepository) {
        this.shopItemRepository = shopItemRepository;
    }

    public Iterable <ShopItem> getAllItem() {return shopItemRepository.findAll();}

    public ShopItem addItem(ShopItem shopItem) {
        return shopItemRepository.save(shopItem);
    }

    public ShopItem getItemById(Integer id) {
        Optional<ShopItem> optionalShopItem = shopItemRepository.findById(id);
        if (optionalShopItem.isEmpty()) {
            throw new ResponseStatusException(HttpStatusCode.valueOf(404));

        }
        return optionalShopItem.get();
    }

    public ShopItem updateItem (Integer id, ShopItem updatedShopItem){
        ShopItem existingShopItem = shopItemRepository.findById(updatedShopItem.getId())
                .orElseThrow(() -> new IllegalArgumentException("Player not found with id: " + updatedShopItem.getId()));


        // Update player properties if the incoming values exist
        if (updatedShopItem.getUrl() != null) {
            existingShopItem.setUrl(updatedShopItem.getUrl());
        }
        if (!Double.isNaN(updatedShopItem.getPrice())) {
            existingShopItem.setPrice(updatedShopItem.getPrice());
        }
        if (updatedShopItem.getDescription() != null) {
            existingShopItem.setDescription(updatedShopItem.getDescription());
        }
        if (updatedShopItem.getCategory() != null) {
            existingShopItem.setCategory(updatedShopItem.getCategory());
        }
        if (updatedShopItem.getSize() != null) {
            existingShopItem.setSize(updatedShopItem.getSize());
        }
        if (updatedShopItem.getQuantity() != null) {
            existingShopItem.setQuantity(updatedShopItem.getQuantity());
        }


        // Save the updated player to the database
        return shopItemRepository.save(existingShopItem);
    }


    public HashMap<String, Object> deleteItem(Integer id) {
        HashMap<String, Object> response = new HashMap<>();

        ShopItem shopItem = shopItemRepository.findById(id)
                .orElse(null);

        if (shopItem != null) {
            shopItemRepository.delete(shopItem);
            response.put("wasDeleted", true);
            response.put("item", shopItem);
        } else {
            response.put("wasDeleted", false);
            response.put("item", null);
            response.put("message", "Item not found with id: " + id);
        }

        return response;
    }
}
