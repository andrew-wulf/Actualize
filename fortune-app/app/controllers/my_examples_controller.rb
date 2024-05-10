class MyExamplesController < ApplicationController

  def fortune
    visits = 0
    fortunes = ['You will win the lottery! The numbers are fi-', 'You will die within the next 80 years.', 'It will rain this month.']

    new_fortune = fortunes[rand(fortunes.length)]
    numbers = []
    6.times do
      numbers.push(rand(1..60))
    end
    visits +=1

    render json: {fortune: new_fortune, lotto_numbers: numbers, visits: visits}
  end

end