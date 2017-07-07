class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
          #, :omniauthable
  include DeviseTokenAuth::Concerns::User
  mount_base64_uploader :profile_picture, ProfilePictureUploader
  has_one :mecano_profile
  has_many :vehicles
  has_many :services
  after_create :send_welcome_email

  def token_validation_response
    UserSerializer.new(self).as_json
  end

  private

  def send_welcome_email
    UserMailer.welcome(self).deliver_now
  end
end
