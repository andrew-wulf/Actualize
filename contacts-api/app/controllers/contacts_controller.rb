class ContactsController < ApplicationController
  def index
    @contacts = Contact.all
  end

  def index
    @contacts = Contact.all
    render(template: "contacts/index", formats: :json)
  end

  def show
    @contact = Contact.first
    render(template: "contacts/show", formats: :json)
  end

end
