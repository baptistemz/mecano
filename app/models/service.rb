class Service < ActiveRecord::Base
  extend Enumerize
  belongs_to :mecano_profile
  belongs_to :user
  belongs_to :vehicle
  has_many :vehicles
  enumerize :status, in: [:pending, :canceled, :finished]
  validates_presence_of :user_id, :mecano_profile_id, :status
  validates_uniqueness_of :user_id, scope: [:mecano_profile_id, :status]
  validate :no_self_service #lol

  def no_self_service
    errors.add(:user_id, "Vous ne pouvez pas vous contacter vous-même") if user_id == mecano_profile.user_id
  end
end
