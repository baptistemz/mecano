class Service < ActiveRecord::Base
  belongs_to :mecano_profile
  belongs_to :user
  belongs_to :vehicle
  has_many :vehicles
  after_create :send_contact_email

  private

  def send_contact_email
    ServiceMailer.contact(self).deliver_now
  end
end
