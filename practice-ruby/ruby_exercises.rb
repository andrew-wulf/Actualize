#Create and define a variable count = 0. Using a loop and the += operator, output the following:

x = 0
while x < 11
  puts x
  x +=1
end


#Sam enjoys cooking. Make an array with recipe names to represent the different recipes Sam can cook.
#Sally speaks many languages. Make an array with language names to represent the languages Sally can speak.
#If Sam can cook more than 10 recipes and Sally speaks more than 5 languages, they should date. Based on the above arrays, print out a message describing whether or not they should date.
#If Sam can make crepes or Sally can speak French, they should marry. Based on the above arrays, print out a message describing whether or not they should marry.



recipes = ['casserole', 'salad', 'crepes', 'stew', 'pizza', 'pie']
languages = ['english', 'french', 'spanish', 'german', 'japanese']

if recipes.length > 10 && languages.length > 5
  puts "They should kiss!"
end

if recipes.include?('crepes') || languages.include?('french')
  puts "They should get married!"
end