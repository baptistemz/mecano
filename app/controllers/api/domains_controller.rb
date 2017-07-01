module Api
  class DomainsController < BaseController
    before_action :authenticate_api_user!

    def register_domains
      @domains = current_api_user.mecano_profile.domains.create(domain_params[:domains])
      render :index, status: :created
    end

    def update_technical_domains
      current_api_user.mecano_profile.domains.where(kind: :technical_skill).destroy_all
      @domains = current_api_user.mecano_profile.domains.create(domain_params[:domains])
      render :index, status: :created
    end

    def update_car_domains
      current_api_user.mecano_profile.domains.where(kind: :car_make).destroy_all
      @domains = current_api_user.mecano_profile.domains.create(domain_params[:domains])
      if @domains.any?
        current_api_user.mecano_profile.update(all_vehicles: false)
      else
        current_api_user.mecano_profile.update(all_vehicles: true)
      end
      render :index, status: :created
    end

    private

    def domain_params
      params.permit(:kind, :value, :domains => [:value, :kind])
    end

    def render_error
      render json: { errors: @domain.errors },
        status: :unprocessable_entity
    end
  end
end
