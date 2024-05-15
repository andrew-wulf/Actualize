class ContactsController < ApplicationController

  def index
    @contacts = Contact.all
    render(template: "contacts/index", formats: :json)
  end

  def show
    @contact = Contact.first
    render(template: "contacts/show", formats: :json)
  end

  def contacts
    @contact = Contact.last
    render(template: "contacts/contacts", formats: :json)
  end

  def challenge
    @contact = Contact.all
    render(template: "contacts/challenge", formats: :json)
  end
end

