class Recommendation < ActiveRecord::Base
  belongs_to :domain
  belongs_to :user
  validates_uniqueness_of :user_id, scope: :domain_id
  validate :no_self_recommendation #important (a mecano mustn't be able to recommend himself)

  def no_self_recommendation
    errors.add(:user_id, I18n.t('recommendation.no_self_recommendation_message')) if user_id == domain.mecano_profile.user_id
  end

  def name
    return "#{domain.value}-#{user.display_name}"
  end
end
