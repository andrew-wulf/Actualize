#Part One: Weather Data
# In weather.dat you’ll find daily weather data for Morristown, NJ for June 2002. Download this text file, then write a program to output the day number (column one) with the smallest temperature spread (the maximum temperature is the second column, the minimum the third column).

path = "/Users/awulf/Desktop/weather.dat"

file = File.new(path, 'r')

data = file.readlines.map(&:chomp)

rows = {}

i = 2
while i < data.length
  row = data[i].split(' ')
  column, max, min = row[0], row[1], row[2]

  rows[column] = max.to_f - min.to_f

  i+=1
end

i, smallest, index = 0, 100000, 0

while i < rows.keys.length
  curr = rows[rows.keys[i]]
  if curr < smallest
    smallest, index = curr, i
  end
  i+=1
end

puts "Smallest Column: #{rows.keys[index]}"




# The file football.dat contains the results from the English Premier League for 2001/2. The columns labeled ‘F’ and ‘A’ contain the total number of goals scored for and against each team in that season (so Arsenal scored 79 goals against opponents, and had 36 goals scored against them). Write a program to print the name of the team with the smallest difference in ‘for’ and ‘against’ goals.


path = "/Users/awulf/Desktop/football.dat"
file = File.new(path, 'r')

data = file.readlines.map(&:chomp)

rows = {}

i = 1
while i < data.length
  row = data[i].split(' ')
  if not row[0].include?('-')
    team, points_for, points_against = row[1], row[6], row[7]
    rows[team] = points_for.to_i - points_against.to_i
  end
  i+=1
end

i, smallest, index = 0, 100000, 0

while i < rows.keys.length
  curr = rows[rows.keys[i]]
  if curr < smallest
    smallest, index = curr, i
  end
  i+=1
end

puts "Smallest difference team: #{rows.keys[index]}"


# Part Three: DRY Fusion
# Take the two programs written previously and factor out as much common code as possible, leaving you with two smaller programs and some kind of shared functionality.



def smallest_difference(path)
  if path.include?('weather')
    first_line, name, target1, target2, label  = 2, 0, 1, 2, 'Col'
  end
  if path.include?('football')
    first_line, name, target1, target2, label = 1, 1, 6, 7, 'team'
  end

  file = File.new(path, 'r')

  data = file.readlines.map(&:chomp)

  rows = {}

  i = first_line
  while i < data.length
    row = data[i].split(' ')
    if not row[0].include?('-')
      column, max, min = row[name], row[target1], row[target2]

      rows[column] = max.to_f - min.to_f
    end
    i+=1
  end

  i, smallest, index = 0, 100000, 0
  while i < rows.keys.length
    curr = rows[rows.keys[i]]
    if curr < smallest
      smallest, index = curr, i
    end
    i+=1
  end

  puts "Smallest Difference: #{smallest} | #{label}: #{rows.keys[index]}"
end


files = ["/Users/awulf/Desktop/weather.dat", "/Users/awulf/Desktop/football.dat"]

for file in files
  smallest_difference(file)
end