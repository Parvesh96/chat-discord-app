class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception
    before_action :configure_permitted_params, if: :devise_controller?
    helper_method :user_except_current

    protected

    def configure_permitted_params
        devise_parameter_sanitizer.permit(:sign_up, keys:[:username, :name, :email])
        devise_parameter_sanitizer.permit(:account_update, keys:[:username, :name, :email])
    end

    # Get All Users Accept Current Logged In User
    def user_except_current
        @user = User.where.not(id: current_user)
    end

end
