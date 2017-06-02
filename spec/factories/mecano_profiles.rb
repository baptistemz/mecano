FactoryGirl.define do
  factory :mecano_profile do
    address Faker::Address.street_address
    city Faker::Address.city
    country Faker::Address.country
    pro Faker::Boolean.boolean
    price {Faker::Number.between(10, 300) if pro}
    company_name {Faker::Company.name if pro}
    mobile Faker::Boolean.boolean
    radius {Faker::Number.between(10, 1000) if mobile}
  end
end
