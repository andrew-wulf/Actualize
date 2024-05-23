//Make a shopping cart class that holds items and returns their attributes.


class Cart {
  constructor() {
    this.items = [];
  }

  display() {
    this.items.forEach(function(x) {x.display()});
    console.log(`Item Count: ${this.items.length}`)

  }

  add_item(item) {
    this.items.push(item)
  }
}



class Item {
  constructor(name, color, price) {
    this.name = name;
    this.color = color;
    this.price = price;
  }
  display() {
    let str = `Item: ${this.name} | Color: ${this.color} | Price: ${this.price}`
    console.log(str)
  }
}

let cart = new Cart

let item1 = new Item('apple', 'red', 45)
let item2 = new Item('banana', 'yellow', 20)
let item3 = new Item('pear', 'green', 34)

let arr = [item1, item2, item3]
arr.forEach(function(item) {cart.add_item(item)})

cart.display()


