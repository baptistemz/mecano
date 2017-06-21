class Vehicle < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :brand, :model, :year, :user_id
  validates_uniqueness_of :user_id, scope: [:brand, :model, :year, :trim] 
end
