module Api
  class AuthcheckController < BaseController
    before_action :authenticate_api_user!

    def create
      MecanoProfile.where(user_id: current_api_user.id).first.domains.create(kind:'car_make', name:'audi')
      if @domain.save
        render :show, status: :created
      else
        render_error
      end
    end

    private

    def domain_params
      params.permit(:kind, :name)
    end

    def render_error
      render json: { errors: @domain.errors },
        status: :unprocessable_entity
    end

  end
end
