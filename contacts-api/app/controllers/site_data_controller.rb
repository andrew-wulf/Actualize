class SiteDataController < ApplicationController

  def view

    visits = SiteData.all
    

    if visits.length == 0
      data = SiteData.new(visits: 1)
      data.save
    else
      data = SiteData.first
      data.visits += 1
      data.save
    end

    render json: {visits: data.visits}

  end


  def generate_data
    data = []
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
    render json: {Contacts: Contact.all}
  end


  


end
