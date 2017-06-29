json.mecano_profile do
  json.extract! @mecano_profile, :id, :pro, :mobile, :price, :rating, :all_vehicles, :city, :country
  json.display_name @mecano_profile.display_name
  json.picture @mecano_profile.user.profile_picture
end
json.domains @mecano_profile.domains.where(kind:'technical_skill')
json.car_makes @mecano_profile.domains.where(kind:'car_make')
