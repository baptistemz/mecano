class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :created_at, :mark
  has_one :user

  def user
    if object.user
      {display_name: object.user.display_name, picture: object.user.profile_picture.thumb}
    else
      {display_name: "Ancien utilisateur", picture: {url: "/thumb/default_profile.png"}}
    end
  end
end
