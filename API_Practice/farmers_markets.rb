require "http"


markets = HTTP.get("https://data.ny.gov/resource/qq4h-8p86.json").parse


my_lat, my_long = 40.7484, -73.9857

example_coordinates = [42.66095, -77.05365]

def find_distance(lat1, long1, lat2, long2)
  a = (lat1 - lat2).abs * 69
  b = (long1 - long2).abs * 54.6
  
  distance = Math.sqrt(a**2 + b**2).round(2)
  return distance
end

#pp markets[0]

puts "\nFind Nearby Farmer's Markets! Your example current location is the empire state building."
puts "How many miles away is the limit for your search?"

while true  
  miles = gets.chomp.to_f
  if miles > 0
    break
  end
end

pp find_distance(my_lat, my_long, *example_coordinates)

close_markets = markets.select {|m| find_distance(my_lat, my_long, m['latitude'].to_f, m['longitude'].to_f) < miles}

to_sort = close_markets.map {|m| [find_distance(my_lat, my_long, m['latitude'].to_f, m['longitude'].to_f), m]}

sorted = []
limit = to_sort.length

while sorted.length < limit

  i, longest, index = 0, 0, 0
  while i < to_sort.length
    curr = to_sort[i][0]
    if curr > longest
      longest, index = curr, i
    end
    i+=1
  end
  sorted.push(to_sort[index][1])
  to_sort.delete_at(index)
end


for m in sorted
  lat, long = m['latitude'].to_f, m['longitude'].to_f
  distance = find_distance(my_lat, my_long, lat, long)
  puts "\n#{m['market_name']} | #{distance} miles away"
  puts "#{m['city']}, #{m['state']} --- Open: #{m['operation_hours']}"
end