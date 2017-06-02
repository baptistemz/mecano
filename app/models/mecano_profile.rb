class MecanoProfile < ActiveRecord::Base
  belongs_to :user
  validates_uniqueness_of :user_id
  validates_presence_of :address, :city, :country
  validates :pro, inclusion: { in: [ true, false ] }
  validates :mobile, inclusion: { in: [ true, false ] }
  with_options if: :is_pro? do |pro|
    pro.validates_presence_of :company_name, :price
  end
  with_options if: :is_mobile? do |mobile|
    mobile.validates_presence_of :radius
  end

  def is_pro?
    self.pro == true
  end

  def is_mobile?
    self.mobile == true
  end
end
