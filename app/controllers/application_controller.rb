class ApplicationController < ActionController::Base
  protect_from_forgery with: :reset_session
  
  # def set_access_control_headers
  #   headers['Access-Control-Allow-Origin'] = '*'
  # end  
end
