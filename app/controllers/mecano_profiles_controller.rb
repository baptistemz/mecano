class MecanoProfilesController < ApplicationController
  before_action :authenticate_user!, only: [:create, :update, :delete]
  def create
    @mecano_profile = current_user.mecano_profile.create(mecano_profile_params)
    if @mecano_profile.save
      render :show, status: :created
    else
      render_error
    end
  end

  def index
    # invited_mecano_profiles = []
    # current_user.invitations.joins(:mecano_profile).where("mecano_profiles.user_id != ?", current_user.id).each do |i|
    #   invited_mecano_profiles.push(i.mecano_profile)
    # end
    # @mecano_profiles = current_user.mecano_profiles
    # @contributions = invited_mecano_profiles
    # render :index
  end

  def show
    @mecano_profile = MecanoProfile.find(params[:id])
    render :show
  end

  def delete
  end

  private

  def mecano_profile_params
    params.require(:mecano_profile).permit(:pro, :company_name, :wall_picture)
  end

  def render_error
    render json: { errors: @mecano_profile.errors.full_messages },
      status: :unprocessable_entity
  end
end
