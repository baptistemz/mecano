class Vehicle < ActiveRecord::Base
  belongs_to :user
  has_many :services
  validates_presence_of :brand, :model, :year, :user_id
  validates_uniqueness_of :user_id, scope: [:brand, :model, :year, :trim]
end
