json.mecano_profile do
  json.extract! @mecano_profile, :id, :pro, :mobile, :price, :rating, :all_vehicles, :city, :country, :description
  json.contacted @mecano_profile.contacted(current_api_user)
  json.display_name @mecano_profile.display_name
  json.picture @mecano_profile.user.profile_picture
end
json.domains @mecano_profile.domains.where(kind:'technical_skill'), partial: 'api/domains/domain', as: :domain
json.car_makes @mecano_profile.domains.where(kind:'car_make'), partial: 'api/domains/domain', as: :domain
