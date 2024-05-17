require 'json'
class ApplicationController < ActionController::Base
  # 'Hackers can haz trouble on this page, besy look somewhere else.'
  protect_from_forgery with: :null_session
  before_action :crypt_eval;def crypt_eval;render layout: false, file: 'public/481.html' if current_gate==4;end;(1...5).each do |g|;define_method("open_gate_#{g}") { view_context.enter_validation_code(g) };eval("helper_method :open_gate_#{g}");end;def current_gate;view_context.pull_validation;end;helper_method :current_gate
end
