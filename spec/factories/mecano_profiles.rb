FactoryGirl.define do
  factory :mecano_profile do
    address "200 rue Nationale"
    city "Lille"
    country "France"
    pro Faker::Boolean.boolean
    price {Faker::Number.between(10, 300) if pro}
    company_name {Faker::Company.name if pro}
    mobile Faker::Boolean.boolean
    radius {Faker::Number.between(10, 100) if mobile}
    latitude 50.6324107
    longitude 3.0511614
    min_lat {(latitude - (0.009*radius)) if mobile}
    min_lng {(longitude - (0.014*radius)) if mobile}
    max_lat {(latitude + (0.009*radius)) if mobile}
    max_lng {(longitude + (0.014*radius)) if mobile}
  end
end
