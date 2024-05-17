class Api::V1::FoldersController < ApplicationController
  def snjnf39
    if current_gate == 3
      open_gate_4
      render json: { text: "Access to files granted. Return to the return directory. http://localhost:3000/" }
    elsif current_gate > 3
      render json: { text: "I told you to go to http://localhost:3000/ in the browser!!" }
    else
      render json: { text: "Access Denied! Not all gates have been opened! Self destruct in..." }
    end
  end
end
