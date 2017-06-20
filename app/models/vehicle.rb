class Vehicle < ActiveRecord::Base
  belongs_to :user
  validates_presence_of :brand, :model, :year
end
