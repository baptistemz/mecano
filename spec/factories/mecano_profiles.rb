FactoryGirl.define do
  factory :mecano_profile do
    address Faker::Address.street_address
    city Faker::Address.city
    country Faker::Address.country
    pro Faker::Boolean.boolean
    price {Faker::Number.between(10, 300) if pro}
    company_name {Faker::Company.name if pro}
    mobile Faker::Boolean.boolean
    radius {Faker::Number.between(10, 100) if mobile}
    latitude {(rand * (50.8339176-50.8339160) + 50.8339160)}
    longitude {(rand * (4.3357966-4.3357950) + 4.3357950)}
    min_lat {(latitude - (0.009*radius)) if mobile}
    min_lng {(latitude - (0.014*radius)) if mobile}
    max_lat {(latitude - (0.009*radius)) if mobile}
    max_lng {(latitude - (0.014*radius)) if mobile}
  end
end
