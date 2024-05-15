



class Test
  def initialize(args)
    @apple = args[:apple]
    @pear = args[:pear]
    @kiwi = args[:kiwi]
  end

  def display
    pp @apple
    pp @pear
    pp @kiwi
    puts "\n"
  end
end


class Test2
  def initialize(*args)
    @apple = args[0]
    @pear = args[1]
    @kiwi = args[2]
  end

  def display
    pp @apple
    pp @pear
    pp @kiwi
    puts "\n"
  end
end


class Test3
  def initialize(*args)
    @apple = args[0]
    @pear = args[1]
    @kiwi = args[2]
  end

  def display
    pp @apple
    pp @pear
    pp @kiwi
    puts "\n"
  end
end


def test4
  require "faker"


  generator = Faker::Commerce

  50.times do
    name = generator.product_name
    price = (generator.price(range:0...300) * 100).to_i
    dep = generator.department(max: 3)
    
    deps = dep.split(/, | & /)
    

    num = rand(60)
    if num > 40
      sale = rand(0...45)
    else
      sale = 0
    end
    url = nil
    desc = "This #{generator.color} #{name}, developed by #{generator.brand}, was made in #{Faker::Address.country} only using the finest #{generator.material}!"

    p [name, price, deps, sale, url, desc]
  end
end


test4
