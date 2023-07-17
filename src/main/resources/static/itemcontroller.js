class ItemController {
    constructor() {
        this.currentID = 1;
        this.itemArray = [];
    }

    addItem(url, description, category, price) {
        const itemObj = {
            url,
            description,
            price,
            category,
            id: this.currentID++
        };
        this.itemArray.push(itemObj);
    }

    async getItemsFromBackend() {
        try {
          const response = await fetch("http://localhost:8080/shopitem/items");
          if (!response.ok) {
            throw new Error("Failed to fetch items from the backend.");
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("An error occurred while fetching items:", error);
          throw error;
        }
      };
    }
