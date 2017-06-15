class Domain < ActiveRecord::Base
  extend Enumerize
  belongs_to :mecano_profile
  enumerize :kind, in: [:car_make, :technical_skill]
  validates_presence_of :kind, :name, :mecano_profile_id
  validates_uniqueness_of :name, scope: :mecano_profile_id
end
