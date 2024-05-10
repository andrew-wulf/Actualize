class ExamplesController < ActionController::Base
  def home
    render template: "layouts/examples/home"
  end
  def cooking
    render template: "layouts/examples/cooking"
  end
end