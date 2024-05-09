



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

test = Test.new({apple: 3, pear: 4, kiwi: 5})
test.display

test2 = Test2.new(5, apple=3, pear=4)
test2.display

test3 = Test3.new(5, apple=3, pear=4)
test3.display