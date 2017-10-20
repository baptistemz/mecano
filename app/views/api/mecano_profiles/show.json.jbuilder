json.mecano_profile do
  json.extract! @mecano_profile, :id, :pro, :mobile, :price, :rating, :radius, :rates_number, :all_vehicles, :city, :country, :company_name, :description
  json.contacted @mecano_profile.contacted(current_api_user)
  json.display_name @mecano_profile.display_name
  json.full_address @mecano_profile.full_address
  json.picture @mecano_profile.user.profile_picture
end
json.domains @mecano_profile.domains.where(kind:'technical_skill'), partial: 'api/domains/domain', as: :domain
json.car_makes @mecano_profile.domains.where(kind:'car_make'), partial: 'api/domains/domain', as: :domain
json.reviews @mecano_profile.reviews.last(2).sort_by(&:created_at).reverse, partial: 'api/reviews/review', as: :review
