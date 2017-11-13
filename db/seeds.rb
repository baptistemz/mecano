#USERS
User.where('email LIKE ?', '%.ninja%').each do |user|
  Rails.logger.debug("on va supprimer #{user.email}")
  user.services.destroy_all
  user.destroy!
end

staline = User.create!(first_name: "joseph", last_name: "staline", email: "contact@staline.ninja", password: "12345678", password_confirmation: "12345678", profile_picture: File.open(Rails.root.join("db/seeds/images/staline.jpg")))
poutine =  User.create!(first_name: "vladimir", last_name: "poutine", email: "contact@poutine.ninja", password: "12345678", password_confirmation: "12345678", profile_picture: File.open(Rails.root.join("db/seeds/images/poutine.jpeg")))
mao =  User.create!(first_name: "Mao", last_name: "zedong", email: "contact@mao.ninja", password: "12345678", password_confirmation: "12345678", profile_picture: File.open(Rails.root.join("db/seeds/images/mao.jpeg")))
degaulle =  User.create!(first_name: "général", last_name: "de gaulle", email: "contact@degaulle.ninja", password: "12345678", password_confirmation: "12345678", profile_picture: File.open(Rails.root.join("db/seeds/images/degaulle.jpg")))
pompidou = User.create!(first_name: "georges", last_name: "pompidou", email: "contact@pompidou.ninja", password: "12345678", password_confirmation: "12345678", profile_picture: File.open(Rails.root.join("db/seeds/images/pompidou.jpg")))
roosevelt = User.create!(first_name: "theodore", last_name: "roosevelt", email: "contact@roosevelt.ninja", password: "12345678", password_confirmation: "12345678", profile_picture: File.open(Rails.root.join("db/seeds/images/roosevelt.jpg")))
churchill = User.create!(first_name: "winston", last_name: "churchill", email: "contact@churchill.ninja", password: "12345678", password_confirmation: "12345678", profile_picture: File.open(Rails.root.join("db/seeds/images/churchill.jpg")))

@users = [staline, poutine, mao, degaulle, pompidou, roosevelt, churchill]

#VEHICLES

@random_vehicles = [{brand:"maserati", model:"GT", year:2007, trim:""}, {brand:"volkswagen", model:"Passat", year:2013, trim:" TDI SE"}, {brand:"volkswagen", model:"Golf", year:1984, trim:""}, {brand:"volkswagen", model:"Golf", year:1996, trim:"GL"}, {brand:"mercedes-benz", model:"C", year:1996, trim:"230"}, {brand:"porsche", model:"911", year:2013, trim:"Carrera 4"}, {brand:"porsche", model:"911", year:2013, trim:"Carrera 4"}, {brand:"volkswagen", model:"Golf", year:1984, trim:""}, {brand:"volkswagen", model:"Golf", year:1984, trim:""}, {brand:"audi", model:"A1", year:2010, trim:"1.2"}, {brand:"chevrolet", model:"Avalanche", year:2010, trim:""}, {brand:"chevrolet", model:"Camaro", year:2014, trim:"LS 2dr Coupe w/1LS (3.6L 6cyl 6M)"}, {brand:"ferrari", model:"California", year:2011, trim:""}, {brand:"ferrari", model:"612", year:2009, trim:"Scaglietti"}, {brand:"tesla", model:"Roadster", year:2008, trim:""}, {brand:"bentley", model:"Arnage", year:2009, trim:""}, {brand:"volkswagen", model:"Golf", year:1997, trim:""}, {brand:"chevrolet", model:"Avalanche", year:2013, trim:"LS 2WD"}, {brand:"chevrolet", model:"Avalanche", year:2009, trim:""}, {brand:"jeep", model:"Wrangler", year:2005, trim:"2.4 Sport"}]

def create_vehicles(user)
  vehicles = @random_vehicles.sample(rand(0..(@random_vehicles.length/4)))
  vehicles.each{|v| user.vehicles.find_or_create_by(v)}
end

@vehicles = [create_vehicles(staline), create_vehicles(poutine), create_vehicles(mao), create_vehicles(degaulle), create_vehicles(pompidou), create_vehicles(roosevelt), create_vehicles(churchill)]

#MECANO_PROFILES
staline_mecano_profile = staline.create_mecano_profile!(pro: false, mobile: true, address: "23 Rue Nationale", radius: 50, city: "59000 Lille", country: " France", all_vehicles: true, description: "Je travaille sur tous types de véhicules. J'ai un garage en plein centre de Lille et me déplace dans la métropole.")
poutine_mecano_profile =  poutine.create_mecano_profile!(pro: true, company_name: "le kremlin", mobile: true, address: "23 Rue de gand", radius: 30, price: 200, city: "Tourcoing", country: " France", all_vehicles: true)
mao_mecano_profile =  mao.create_mecano_profile!(pro: false, mobile: false, address: "230 Boulevard de la Liberté", city: "59000 Lille", country: "France", all_vehicles: false, description: "Viens chez moi. Tu n'as pas le choix")
degaulle_mecano_profile =  degaulle.create_mecano_profile!(pro: true, company_name: "Garage de Gaulle", mobile: true, radius: 100, address: "120 Boulevard Gambetta", price: 220, city: "Roubaix", country: " France", all_vehicles: true, description: "Nous sommes une équipe de trois professionnels dans un garage bien équipé à Roubaix. Nous pouvons venir chercher votre voiture avec notre plateau.")
pompidou_mecano_profile = pompidou.create_mecano_profile!(pro: false, mobile: true, address: "23 Rue de Courtrai", radius: 30, city: "Tournai", country: "Belgique", all_vehicles: false)
roosevelt_mecano_profile = roosevelt.create_mecano_profile!(pro: false, mobile: false, address: "2 Rue du Général Leclerc", city: "Ronchin", country: " France", all_vehicles: false)
churchill_mecano_profile = churchill.create_mecano_profile!(pro: false, mobile: true, address: "289 Boulevard de la Liberté", radius: 50, city: "Lille", country: "France", all_vehicles: true)

@mecano_profiles = [staline_mecano_profile, poutine_mecano_profile, mao_mecano_profile, degaulle_mecano_profile, pompidou_mecano_profile, roosevelt_mecano_profile, churchill_mecano_profile]

#DOMAINS

@domains = []

def create_domains(profile, values, kind)
  values.each do |value|
    @domains << profile.domains.create!(kind: kind, value: value )
  end
end



#car makes
mao_makes = ["jaguar", "mg", "triumph", "aston-martin", "peugeot", "citroen", "renault"]
create_domains(mao_mecano_profile, mao_makes, :car_make)
pompidou_makes = ["volkswagen", "porsche", "mercedes-benz", "bmw", "audi", "jaguar", "mg", "triumph", "ferrari", "maserati", "lamborghini", "bugatti", "fiat", "alfa-romeo" ]
create_domains(pompidou_mecano_profile, pompidou_makes, :car_make)
roosevelt_makes = ["volkswagen", "porsche", "mercedes-benz", "bmw", "audi", "jaguar", "mg", "triumph", "aston-martin", "peugeot", "citroen", "renault", "ferrari", "maserati", "lamborghini", "bugatti", "fiat", "alfa-romeo" ]
create_domains(roosevelt_mecano_profile, roosevelt_makes, :car_make)


#technical skills
technical_skills = ["wheels", "brakes", "timing", "exhaust", "gearing_system", "car_body", "electricity", "interior", "air_conditioning", "shock_absorbers", "electronic", "maintenance"]

@mecano_profiles.each do |mecano_profile|
  create_domains(mecano_profile, technical_skills.sample(rand(1..technical_skills.length)), :technical_skill)
end

#RECOMMENDATIONS
def recommend_domains(user, domains)
  domains.each do |domain|
    user.recommendations.create(domain_id: domain.id)
  end
end

@users.each do |user|
  recommend_domains(user, @domains.sample(rand(1..(@domains.length/2))))
end

# SERVICES
@services = []

@users.each do |user|
  if user.vehicles.any?
    mecano = (@mecano_profiles - [user.mecano_profile]).sample
    service = Service.create(mecano_profile_id: mecano.id, status: :pending, user_id: user.id, vehicle_id: user.vehicles.last.id)
    @services << service
  end
end

#REVIEWS
@services.each do |service|
  mark = Random.new().rand(1..5)
  service.update!(status: :finished)
  service.user.reviews.create(mark: mark, mecano_profile_id: service.mecano_profile_id, service_id: service.id)
  new_rates_number = (service.mecano_profile.rates_number || 0) + 1
  new_rating = ((service.mecano_profile.rating || 0) * (service.mecano_profile.rates_number || 0) + mark) / new_rates_number
  service.mecano_profile.update(rating: new_rating, rates_number: new_rates_number)
end
