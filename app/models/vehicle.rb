class Vehicle < ActiveRecord::Base
  belongs_to :user
  has_many :services, dependent: :nullify
  validates_presence_of :brand, :model, :year, :user_id
  validates_uniqueness_of :user_id, scope: [:brand, :model, :year, :trim]

  def name
    return "#{brand} #{model}"
  end
end
