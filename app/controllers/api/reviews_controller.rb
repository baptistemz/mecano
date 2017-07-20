module Api
  class ReviewsController < BaseController
    before_action :authenticate_api_user!

    def create
      service = getService(review_params[:mecano_profile_id])
      service.update!(
        status: params[:status],
        cancel_reason: params[:cancel_reason],
        amount: params[:amount],
      )
      review_params.merge!(service_id: service.id)
      @review =current_api_user.reviews.create(review_params.merge!(service_id: service.id))
      if @review.save
        render :show, status: :created
      else
        render_error
      end
    end


    private

    def getService(mecano_id)
      current_api_user.services.where(
        mecano_profile_id: mecano_id,
        status: "pending"
      ).first || current_api_user.services.where(
        mecano_profile_id: mecano_id
      ).last
    end

    def render_error
      render json: { errors: @review.errors },
        status: :unprocessable_entity
    end

    def review_params
      params.permit(:mark, :comment, :mecano_profile_id)
    end
  end
end
