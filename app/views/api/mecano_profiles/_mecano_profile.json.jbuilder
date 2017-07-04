if @with_distance
  json.extract! mecano_profile, :id, :pro, :mobile, :price, :rating, :distance, :country, :city
else
  json.extract! mecano_profile, :id, :pro, :mobile, :price, :rating, :country, :city
end
json.display_name mecano_profile.display_name
json.picture mecano_profile.user.profile_picture
