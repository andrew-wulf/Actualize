class PetsController < ApplicationController

  def create
    if current_user
      @pet = Pet.new(name: params[:name], age: params[:age], breed: params[:breed], user_id: current_user.id)
      @pet.save
      @user = current_user
      render(template: 'users/show')

    else
      render json: {}, status: :unauthorized
    end
  end

  def index
    @pets = Pet.all
    render :index
  end

  def show
    @pet = Pet.find_by(id: params[:id])
    render :show
  end

  def update
    if authenticate_user
      @pet = Pet.find_by(id: params[:id])
      @pet.update(name: paramas[:name], age: paramas[:age], breed: paramas[:breed])
      render :show
    end
  end

  def destroy
    if authenticate_user
      @pet = Pet.find_by(id: params[:id])
      @pet.destroy
      render json: {status: 'Entry deleted successfully.'}
    end
  end

end
