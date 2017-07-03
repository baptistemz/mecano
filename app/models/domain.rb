class Domain < ActiveRecord::Base
  extend Enumerize
  belongs_to :mecano_profile
  enumerize :kind, in: [:car_make, :technical_skill]
  validate :enumerable_technical_skills
  validates_presence_of :kind, :value, :mecano_profile_id
  validates_uniqueness_of :value, scope: :mecano_profile_id

  private

  def enumerable_technical_skills
    technical_skill_values = ["wheels", "brakes", "timing", "exhaust", "gearing_system", "car_body", "electricity", "interior", "air_conditioning", "shock_absorbers", "electronic", "maintenance"]
    if !technical_skill_values.include?(value) and kind == "technical_skill"
      errors.add(:value, "technical skill not registered")
    end
  end
end
