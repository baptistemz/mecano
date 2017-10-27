class MecanoProfile < ActiveRecord::Base
  belongs_to :user
  has_many :domains, dependent: :destroy
  has_many :services, dependent: :nullify
  has_many :reviews, dependent: :destroy

  mount_base64_uploader :wall_picture, WallPictureUploader

  # scope :with_domains, -> (domains_list) { joins(:domains).select{|mecano| mecano.domains.pluck(:value).sort == domains_list.sort}.uniq}
  scope :with_domains, -> (domains_list) { joins(:domains).select{|mecano| (domains_list - mecano.domains.pluck(:value)).empty? }.uniq}
  scope :with_car_make, -> (car_make) { joins(:domains).where( '(domains.value = ?) OR (all_vehicles = ?)', car_make, true).distinct }
  validates_uniqueness_of :user_id
  validates_presence_of :address, :city, :country, :user_id
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
  after_destroy :set_user_as_not_mecano

  def display_name
    if self.pro
      return company_name.capitalize
    else
      return "#{self.user.first_name.capitalize} #{self.user.last_name[0].capitalize}"
    end
  end

  def name
    display_name
  end

  def full_address
    return "#{address},#{city},#{country}"
  end

  def contacted(user)
    user ? self.services.where(status: "pending", user_id: user.id).any? : false
  end

  def update_average_rating
    rates_number = reviews.length
    rating = (reviews.pluck(:mark).inject(:+).to_f / reviews.length.to_f).round(2)
    self.update(rating: rating, rates_number: rates_number)
  end

  private

  def is_pro?
    self.pro
  end

  def is_mobile?
    self.mobile
  end

  def set_user_as_mecano
    self.user.update(is_mecano: true)
  end

  def set_user_as_not_mecano
    self.user.update(is_mecano: false)
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
