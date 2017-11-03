json.extract! review, :id, :comment, :mark, :created_at
json.user do
  json.display_name review.user ? review.user.display_name : "Ancien utilisateur"
  json.picture review.user ? review.user.profile_picture.thumb : {url: "/thumb/default_profile.png"}
end
