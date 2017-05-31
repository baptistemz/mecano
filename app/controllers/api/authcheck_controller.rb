module Api
  class AuthcheckController < BaseController
    before_action :authenticate_api_user!
    def checkme
      render json: current_api_user || {}
    end
  end
end
