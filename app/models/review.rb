class Review < ActiveRecord::Base
  belongs_to :mecano_profile
  belongs_to :user
  belongs_to :service
  validates_numericality_of :mark, :only_integer => true
  validates_inclusion_of :mark, :in => 0..5
  after_create :update_mecano_review_data

  private

  def name
    return "#{mark}-#{mecano_profile.display_name}-#{user.display_name}"
  end
  
  def update_mecano_review_data
    mecano_profile.update_average_rating
  end
end
