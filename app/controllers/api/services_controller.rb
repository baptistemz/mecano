module Api
  class ServicesController < BaseController
    before_action :authenticate_api_user!
    def create
      @service =current_api_user.services.create(service_params.except(:first_message))
      if @service.save
        if ServiceMailer.contact( @service, service_params[:first_message]).deliver_now
          render :show, status: :created
        else
          render_error
        end
      else
        render_error
      end
    end

    def cancel
      @service = current_api_user.services.where(mecano_profile_id: params[:mecano_profile_id], status: :pending).last
      if @service.update(status: "canceled")
        render :show
      else
        render_error
      end
    end

    private

    def render_error
      render json: { errors: @service.errors },
        status: :unprocessable_entity
    end

    def service_params
      params.permit(:mecano_profile_id, :first_message, :vehicle_id, :status, :cancel_reason)
    end
  end
end
