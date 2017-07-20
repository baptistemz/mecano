class Review < ActiveRecord::Base
  belongs_to :mecano_profile
  belongs_to :user
  belongs_to :service
  validates_numericality_of :mark, :only_integer => true
  validates_inclusion_of :mark, :in => 0..5
  after_create :update_mecano_review_data

  private

  def update_mecano_review_data
    new_rating = (mecano_profile.rating.to_f + mark) / (mecano_profile.rates_number.to_i + 1)
    new_rates_number = mecano_profile.rates_number.to_i + 1
    mecano_profile.update!(rating: new_rating, rates_number: new_rates_number)
  end
end
