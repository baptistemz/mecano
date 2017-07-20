module Api
  class VehiclesController < BaseController
    before_action :authenticate_api_user!
    def create
      @vehicle =current_api_user.vehicles.find_or_create_by(vehicle_params)
      if @vehicle.save
        render :show, status: :created
      else
        render_error
      end
    end

    def index
      @vehicles = current_api_user.vehicles
    end

    def destroy
      @vehicle = current_api_user.vehicles.find(params[:id])
      @vehicle.destroy
      render :show
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
