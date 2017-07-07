class MecanoProfile < ActiveRecord::Base
  belongs_to :user
  has_many :domains
  has_many :services

  # scope :with_domains, -> (domains_list) { joins(:domains).select{|mecano| mecano.domains.pluck(:value).sort == domains_list.sort}.uniq}
  scope :with_domains, -> (domains_list) { joins(:domains).select{|mecano| (domains_list - mecano.domains.pluck(:value)).empty? }.uniq}
  scope :with_vehicle, -> (vehicle) { joins(:domains).where( '(domains.value = ?) OR (all_vehicles = ?)', vehicle, true).distinct }

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
  geocoded_by :full_address
  after_validation :geocode, if: :address_changed?
  after_validation :set_bound_box
  after_create :set_user_as_mecano

  def display_name
    if self.pro
      return company_name.capitalize
    else
      return "#{self.user.first_name.capitalize} #{self.user.last_name[0].capitalize}"
    end
  end

  def full_address
    return "#{address}, #{city}, #{country}"
  end

  private

  def is_pro?
    self.pro == true
  end

  def is_mobile?
    self.mobile == true
  end

  def set_user_as_mecano
    self.user.update(is_mecano: true)
  end

  def set_bound_box
    if mobile
      bounding_box = Geocoder::Calculations.bounding_box([latitude, longitude], radius, :units => :km)
      self.min_lat = bounding_box[0]
      self.min_lng = bounding_box[1]
      self.max_lat = bounding_box[2]
      self.max_lng = bounding_box[3]
    end
    return true
  end

end
