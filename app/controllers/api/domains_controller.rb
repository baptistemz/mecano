module Api
  class DomainsController < BaseController
    before_action :authenticate_api_user!

    def register_domains
      @domains = current_api_user.mecano_profile.domains.create(domain_params[:domains])
      render :index, status: :created
    end

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
      params.permit(:kind, :name, :domains => [:name, :kind])
    end

    def render_error
      render json: { errors: @domain.errors },
        status: :unprocessable_entity
    end
  end
end
