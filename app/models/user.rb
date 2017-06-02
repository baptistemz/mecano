class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
          #, :omniauthable
  include DeviseTokenAuth::Concerns::User
  mount_base64_uploader :profile_picture, ProfilePictureUploader
  has_one :mecano_profiles
end
