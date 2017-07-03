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
      if params[:distance] == "0"
        coord = Geocoder.coordinates(params[:full_address])
        @mecano_profiles = MecanoProfile.where(
          '(mobile= ?) AND
           (min_lat < ?) AND
           (max_lat > ?) AND
           (min_lng < ?) AND
           (max_lng > ?)',
           true, coord.first, coord.first, coord.last, coord.last
          )
        @mecano_profiles = @mecano_profiles.with_vehicle(params[:vehicle]) if params[:vehicle].present?
        @mecano_profiles = @mecano_profiles.with_domains(params[:domains]) if params[:domains].present?
        @with_distance = false
        render :index
      else
        @mecano_profiles = MecanoProfile.near(params[:full_address], params[:distance], :units => :km)
        @mecano_profiles = @mecano_profiles.with_vehicle(params[:vehicle]) if params[:vehicle].present?
        @mecano_profiles = @mecano_profiles.with_domains(params[:domains]) if params[:domains].present?
        @with_distance = true
        render :index
      end
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
