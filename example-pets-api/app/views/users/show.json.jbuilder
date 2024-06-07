json.name @user.name
json.email @user.email
json.pets @user.pet.each do |p|
  json.name p.name
  json.age p.age
  json.breed p.breed
end