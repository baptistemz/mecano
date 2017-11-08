class Service < ActiveRecord::Base
  extend Enumerize
  belongs_to :mecano_profile
  belongs_to :user
  belongs_to :vehicle
  has_one :review, dependent: :nullify
  enumerize :status, in: [:pending, :canceled, :finished]
  validates_presence_of :user_id, :mecano_profile_id, :status
  validates_uniqueness_of :user_id, scope: [:mecano_profile_id, :status], unless: :advanced_service?
  validate :no_self_service #important (a mecano mustn't be able to contact and then rate himself)


  private

  def name
    return "#{mecano_profile.display_name}-#{user.display_name}"
  end

  def no_self_service
    errors.add(:user_id, I18n.t('recommendation.no_self_contact_message')) if user_id == mecano_profile.user_id
  end

  def advanced_service?
    status != "pending"
  end
end
