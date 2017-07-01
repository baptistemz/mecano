def create_mecano_profiles_for_search()
  10.times {
    user = User.create(FactoryGirl.attributes_for(:user))
    user.create_mecano_profile(FactoryGirl.attributes_for(:mecano_profile))

  }
end
