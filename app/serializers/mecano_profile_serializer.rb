class MecanoProfileSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :pro, :company_name, :full_address, :display_name, :wall_picture, :rating, :rates_number, :mobile, :address, :radius, :price, :city, :country, :all_vehicles, :description
  has_many :car_makes
  has_many :technical_skills
  has_many :reviews

  def technical_skills
    object.domains.where(kind: 'technical_skill').collect { |ts| {id: ts.id, kind: ts.kind, value: ts.value, mecano_profile_id: ts.mecano_profile_id, recommendation_number: ts.recommendation_number}}
  end

  def car_makes
    object.domains.where(kind: 'car_make').collect { |cm| {id: cm.id, kind: cm.kind, value: cm.value, mecano_profile_id: cm.mecano_profile_id, recommendation_number: cm.recommendation_number}}
  end
end
