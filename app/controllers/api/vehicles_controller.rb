module Api
  class VehiclesController < BaseController
    before_action :authenticate_api_user!
    def create
      @vehicle =current_api_user.vehicles.create(vehicle_params)
      if @vehicle.save
        render :show, status: :created
      else
        render_error
      end
    end

    def index
      @vehicles = current_api_user.vehicles
    end

    def delete
    end

    private

    def vehicle_params
      params.permit(:brand, :model, :year, :trim)
    end

    def render_error
      render json: { errors: @vehicle.errors },
        status: :unprocessable_entity
    end
  end
end
