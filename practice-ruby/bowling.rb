# Write code to keep track of the score of a game of bowling. It should have two methods: `roll` which takes in the number of pins knocked down, and `score` which is called at the end and returns the total game score.


#create class Bowling to keep track of the game.
class Bowling
  attr_reader :active

  def initialize
    @frames, @active = [], true
    puts "Started a new bowling match. \nEnter numbers to record rolls, score = print the score, exit = stop program."
  end

  def roll(x)
    if not @active
      return "Game over, no more rolls!"
    end


    x = x.to_i
    prev = @frames[-1]
    valid = true

    if prev
      if prev.sum == 10 || prev.length == 2
        @frames.push([x])
      else
        if prev[0] + x > 10
          puts "Invalid roll, try again."
          valid = false
        else
          @frames[-1].push(x)
        end
      end
    else
      @frames.push([x])
    end

    if valid
      if x == 0
        puts "gutter ball!"
      else
        puts "rolled #{x}."
      end
    end

    if @frames.length > 11
      @active = false
      puts "Last ball rolled, ending match."

    elsif @frames.length == 11
      if @frames[-1][0] != 10 || @frames[-2][0] != 10
        @active = false
        puts "Last ball rolled, ending match."
      end
    elsif @frames.length == 10
      if @frames[-1].length == 2 && @frames[-1].sum != 10
        @active = false
        puts "Last ball rolled, ending match."
      end
    end
  end


  def score
    puts "Frames: #{@frames}"
    i = 0
    scores = @frames.map {|arr| arr.sum}


    while i < @frames.length
      if i < 9
        curr = @frames[i]

        if curr.sum == 10
          j = i
          if curr[0] == 10
            #Get next two rolls!
            next_roll, second_roll = 0, 0

            if (j + 1) < @frames.length
              next_roll = @frames[j + 1][0]
              scores[i] += next_roll
              
              if next_roll == 10
                if (j + 2) < @frames.length
                  second_roll = @frames[j + 2][0]
                end
              else
                second_roll = @frames[j + 1][1]
              end
              scores[i] += second_roll
            end

          else
            #Get next roll!
            if (j + 1) < @frames.length
              next_roll = @frames[j + 1][0]
              scores[i] += next_roll
            end
          end
        end
      end
      i +=1
    end
    puts "Scores: #{scores}"
    puts "\nFinal Score: #{scores.sum}"
  end
end


def demo
  game = Bowling.new

  while game.active
    comm = gets.chomp
    if comm == "exit"
      return
    elsif comm == "score"
      puts game.score
    else
      game.roll(comm)
    end
  end
  puts "Printing Final score:"
  game.score
end

demo




#------------- Initial guideline I used ------------


#on init, create class variable 'rolls' or 'frames' array. This will keep track of the rolls.

#add methods roll and score to the class, they can be empty for now.


#the goal is to add each frame as an array. whenever "roll" is called, it should take in the number of pins and push it to the 'frames' array. At this point, see if every roll adds a number.


#now test out the score method -- return the sum of the frames array.


#time for some rules -- if the array is empty, add the pins as an array: "[x]"

#second rule: if the array isn't empty, check the last item. if the sum of the array isn't ten and there aren't two items, push score to the last array item. Else, push a new array to 'frames' and push the current score to that.

#last frame: once there are 10 completed frames, if the last frame is a 10 then accept one more roll.

#last frame pt 2.: if there are 11 frames, check to see if the last 2 are strikes. if so, accept one more roll.


#score method -- loop backwards through the score. If a frame is a strike, add 10 to 2 previous frames if they exist. If a frame is a spare, add 10 to 1 previous frame. After this is done, add up the sum of all the numbers.
