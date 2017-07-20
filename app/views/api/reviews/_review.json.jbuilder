json.extract! review, :id, :comment, :mark, :created_at
json.user do
  json.display_name review.user.display_name
  json.picture review.user.profile_picture.thumb
end
