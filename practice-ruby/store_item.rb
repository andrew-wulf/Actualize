# C. Use hashes with symbols to represent the following scenario:

# C.1 - You are the owner of a store that sells items (you decide what specifically). Each item has various properties such as color, price, etc.
# C.2 - Represent 3 items using hashes. Each hash should have the same keys with different values.
# C.3 - Be sure to use symbols for the keys. Try creating hashes using both types of hash symbol syntaxes. (Ruby syntax {:a => 123} vs. “JavaScript” syntax {a: 123}).


# Rewrite your store items using a class instead of a hash.
# a) Choose which attributes should have “reader” methods and which attributes should have “writer” methods.
# b) Create an instance from your store item class. Use puts statements to print the 3 attributes individually to the terminal.
# c) Use the attr_writer method to change a value

#Rewrite your store items using a class with a single options hash in the initialize method.


class Item
  attr_writer :price, :sale, :color
  attr_reader :name, :price, :color, :sale

  def initialize(attributes)
    @name, @price, @color, @sale = attributes[:name], attributes[:price],attributes[:color], attributes[:sale]
    
    if @sale == nil
      @sale = 0
    end
  end
end


class Store
  attr_reader :items
  def initialize
    @items = []
  end

  def add(item)
    @items.push(Item.new(item))
  end

  def display
    puts "Items:"
    i = 1
    
    for item in @items
      price = item.price
      if item.sale > 0
        price = price * (1 - (item.sale.to_f / 100))
      end
      

      line = "#{i} | #{item.name} (#{item.color}) -- $#{price.round(2)}"
      if item.sale > 0
        line += " (#{item.sale}% off!)"
      end
      puts line
      i +=1
    end
  end

  def on_sale(percent)
    @items.each {|item| item.sale = percent.round(2)}
  end

  def change_color(index, color)
    @items[index].color = color
  end
end


item1 = {name: 'apple', color: 'red', price: 12.99}
item2 = {:name => 'banana', :color => 'yellow', :price => 16.25}
item3 = {:name => 'pear', :color => 'green', :price => 8.89}

store = Store.new
for item in [item1, item2, item3]
  store.add(item)
end


#----- Interactive demo below -----

puts "Welcome to my store!"
store.display

puts "commands: sale, color, exit"
while true
  comm = gets.chomp

  if comm == "exit"
    break

  elsif comm == "sale"
    puts "enter a percent for our fire sale! (0 to 99)"
    while true
      num = gets.chomp.to_i
      if num >= 0 && num <= 99
        store.on_sale(num)
        store.display
        break
      end
    end

  elsif comm == "color"
    puts "enter item index."
    while true
      i = gets.chomp.to_i - 1
      if i > -1 && i < store.items.length
        break
      end
    end

    puts "enter a new color."
    color = gets.chomp
   
    store.change_color(i, color)
    puts "Item updated!"
    store.display
  end
end


