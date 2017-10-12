
class MecanoProfilesController < ApplicationController
  def show
    @mecano_profile = MecanoProfile.find(params[:id].split("_").last)
    @technical_skills =[]
    @car_makes =[]
    @mecano_profile.domains.each do |d|
      d_hash = {id: d.id, kind: d.kind, value: d.value, mecano_profile_id: d.mecano_profile_id, recommendation_number: d.recommendation_number, recommended: d.recommended(current_api_user)}
      if d.kind =='technical_skill'
        @technical_skills << d_hash
      elsif d.kind =='car_make'
        @car_makes << d_hash
      end
    end
    render :show
  end
end
