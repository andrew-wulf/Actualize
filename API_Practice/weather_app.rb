require "http"


puts "Welcome to the weather app!"


puts "Enter preferred temperature units (imperial, metric, kelvin). First letter only."
while true
  temp = gets.chomp
  if ['i', 'm', 'k'].include?(temp)
    break
  end
end

if temp == 'i'
  temp, sfx = 'imperial', 'F'
elsif temp == 'm'
  temp, sfx = 'metric', 'C'
elsif temp == 'k'
  temp, sfx = 'kelvin', 'K'
end

puts "Enter the name of a city:"

city = gets.chomp


data = HTTP.get("https://api.openweathermap.org/data/2.5/weather?units=#{temp}&q=#{city}&appid={insert_key_here}").parse

if data['cod'] == '404'
  puts "City not found, try again."
end

city, temp, description = data['name'], data['main']['temp'], data['weather'][0]['description']

puts "#{city} | temp: #{temp} #{sfx} | #{description}"

