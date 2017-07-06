class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :profile_picture, :is_mecano
  has_one :mecano_profile
  has_many :vehicles
end
