#problem: avg of an array

arr, total = [1,2,3,4,5], 0
#loop through all items in the array.
arr.each do |x|
#add each number to a running total, starting at 0.
  total += x
end
#divide the total by the number of numbers in the array.
pp total / arr.length



# Write code to keep track of the score of a game of bowling. It should have two methods: `roll` which takes in the number of pins knocked down, and `score` which is called at the end and returns the total game score.


#create class Bowling to keep track of the game.


#on init, create class variable 'rolls' or 'frames' array. This will keep track of the rolls.

#add methods roll and score to the class, they can be empty for now.


#the goal is to add each frame as an array. whenever "roll" is called, it should take in the number of pins and push it to the 'frames' array. At this point, see if every roll adds a number.


#now test out the score method -- return the sum of the frames array.


#time for some rules -- if the array is empty, add the pins as an array: "[x]"

#second rule: if the array isn't empty, check the last item. if the sum of the array isn't ten and there aren't two items, push score to the last array item. Else, push a new array to 'frames' and push the current score to that.

#last frame: once there are 10 completed frames, if the last frame is a 10 then accept one more roll.

#last frame pt 2.: if there are 11 frames, check to see if the last 2 are strikes. if so, accept one more roll.


#score method -- loop backwards through the score. If a frame is a strike, add 10 to 2 previous frames if they exist. If a frame is a spare, add 10 to 1 previous frame. After this is done, add up the sum of all the numbers.
