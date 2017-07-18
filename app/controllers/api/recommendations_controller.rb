module Api
  class RecommendationsController < BaseController
    before_action :authenticate_api_user!, only: [:create, :delete]

    def create
      @recommendation =current_api_user.recommendations.create(recommendation_params)
      if @recommendation.save
        render :show, status: :created
      else
        render_error
      end
    end

    def pictures
      @pictures = []
      Domain.find(recommendation_params[:domain_id]).recommendations.each do |recommendation|
        @pictures << recommendation.user.profile_picture.micro
      end
      render :pictures, status: :ok
    end

    def delete
      @recommendation = current_api_user.recommendations.where(domain_id: recommendation_params[:domain_id]).first
      if @recommendation.destroy!
        render :show, status: :ok
      else
        render_error
      end
    end

    private

    def render_error
      render json: { errors: @recommendation.errors },
        status: :unprocessable_entity
    end

    def recommendation_params
      params.permit(:domain_id, :user_id)
    end
  end
end
