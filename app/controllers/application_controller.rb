class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected


  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name, :profile_picture])
    devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :profile_picture, :profile_picture_cache, :remove_profile_picture, :password, :password_confirmation])
  end
end
