class ItemController {
    constructor() {
        this.currentID = 0;
        this.itemArray = []
    }

    addItem(url, description, category, price) {
        const itemObj = {
            url,
            description,
            price,
            category,
            id: this.currentID++
        }
        this.itemArray.push(itemObj)
    }

    setLocalStorage() {
        localStorage.setItem("item", JSON.stringify(this.itemArray))
        localStorage.setItem("current-id", JSON.stringify(this.currentID))
    }

    getLocalStorage() {

        this.itemArray = JSON.parse(localStorage.getItem("item")) || []
        this.currentID = JSON.parse(localStorage.getItem("current-id")) || 0
        return this.itemArray

    }
}