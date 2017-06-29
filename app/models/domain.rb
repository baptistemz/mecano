class Domain < ActiveRecord::Base
  extend Enumerize
  belongs_to :mecano_profile
  enumerize :kind, in: [:car_make, :technical_skill]
  enumerize :value, in: [:wheels,
                         :brakes,
                         :timing,
                         :exhaust,
                         :gearing_system,
                         :car_body,
                         :electricity,
                         :interior,
                         :air_conditioning,
                         :shock_absorbers,
                         :electronic,
                         :maintenance], :if => lambda { |o| o.kind = :technical_skill }
  validates_presence_of :kind, :name, :value, :mecano_profile_id
  validates_uniqueness_of :name, :value, scope: :mecano_profile_id
end
