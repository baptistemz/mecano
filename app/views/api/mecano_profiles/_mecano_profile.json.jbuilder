if @with_distance 
  json.extract! mecano_profile, :id, :pro, :mobile, :price, :rating, :distance
else
  json.extract! mecano_profile, :id, :pro, :mobile, :price, :rating
end
json.display_name mecano_profile.display_name
json.picture mecano_profile.user.profile_picture
