class Service < ActiveRecord::Base
  extend Enumerize
  belongs_to :mecano_profile
  belongs_to :user
  belongs_to :vehicle
  has_many :vehicles
  enumerize :status, in: [:pending, :canceled, :finished]
end
