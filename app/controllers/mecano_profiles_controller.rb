
class MecanoProfilesController < ApplicationController
  def show
    @mecano_profile = MecanoProfile.find(params[:id])
    render :show
  end
  def render_error
    render json: { errors: @mecano_profile.errors },
      status: :unprocessable_entity
  end
end
