# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end


Faker::Config.locale = 'es'

name = Faker::Name
emails = ['gmail', 'yahoo', 'outlook', 'hotmail']
50.times do
  first, last = name.unique.first_name, name.last_name
  number = Faker::Base.numerify("###-###-####")
  email = "#{first[0]}.#{last}@#{emails[rand(4)]}.com"

  contact = Contact.new(first_name: first, last_name: last, email: email, phone_number: number)
  contact.save
end