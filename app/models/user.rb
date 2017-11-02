class User < ActiveRecord::Base
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable
          #, :omniauthable
  include DeviseTokenAuth::Concerns::User
  mount_base64_uploader :profile_picture, ProfilePictureUploader
  validates_uniqueness_of :email
  validates_presence_of :first_name, :last_name
  has_one :mecano_profile, dependent: :destroy
  has_many :vehicles, dependent: :destroy
  has_many :services, dependent: :nullify
  has_many :recommendations, dependent: :destroy
  has_many :reviews, dependent: :nullify
  after_create :send_welcome_email

  def token_validation_response
    UserSerializer.new(self).as_json
  end

  def display_name
    return "#{first_name.capitalize} #{last_name[0].capitalize}"
  end

  def name
    display_name
  end

  private

  def send_welcome_email
    UserMailer.welcome(self).deliver_now
  end
end
