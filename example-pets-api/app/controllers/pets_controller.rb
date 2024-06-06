class PetsController < ApplicationController

  def create
    if current_user
      @pet = Pet.new(name: params[:name], age: params[:age], breed: params[:breed], user_id: current_user.id)
      @pet.save
      render json: {status: 'success!', pet: @pet.name, user: current_user.email}

    else
      render json: {}, status: :unauthorized
    end
  end

  def index
    @pets = Pet.all
    render :index
  end


end
