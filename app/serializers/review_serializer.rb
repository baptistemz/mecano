class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comment, :created_at, :mark
  has_one :user

  def user
    {display_name: object.user.display_name, picture: object.user.profile_picture.thumb}
  end
end
