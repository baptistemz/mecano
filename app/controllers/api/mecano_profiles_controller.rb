module Api
  class MecanoProfilesController < BaseController
    before_action :authenticate_api_user!, only: [:create, :update, :delete]
    def create
      @mecano_profile = MecanoProfile.create(mecano_profile_params)
      @mecano_profile.user_id = current_api_user.id
      if @mecano_profile.save
        render :show, status: :created
      else
        render_error
      end
    end

    def update
      @mecano_profile = MecanoProfile.where(user_id: current_api_user.id).first
      if @mecano_profile.update(mecano_profile_params)
        render :show
      else
        render_error
      end
    end

    def index
      MecanoProfile.all
      render :index
    end

    def show
      @mecano_profile = MecanoProfile.find(params[:id])
      render :show
    end

    def delete
    end

    private

    def mecano_profile_params
      params.permit(:pro, :company_name, :mobile, :address, :city, :country, :price, :radius, :is_mecano, :all_vehicles)
    end

    def render_error
      render json: { errors: @mecano_profile.errors },
        status: :unprocessable_entity
    end
  end
end
