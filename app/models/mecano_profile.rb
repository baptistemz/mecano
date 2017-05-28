class MecanoProfile < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :user_id
  validates_presence_of :company_name if :pro
end
