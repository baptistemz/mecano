json.extract! review, :id, :comment, :mark, :created_at
json.user do
  display_name review.user.display_name
  picture review.profile_picture
end
