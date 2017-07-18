class Recommendation < ActiveRecord::Base
  belongs_to :domain
  belongs_to :user
  validates_uniqueness_of :user_id, scope: :domain_id
end
