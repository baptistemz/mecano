require 'rails_helper'
require 'pp'

RSpec.describe "MecanoProfiles :", type: :request do
  # include_context "db_cleanup_each", :transaction
  context "mecano profile" do
    let(:user_props) { FactoryGirl.attributes_for(:user) }
    let(:account) {signup(user_props, :ok)}
    let!(:user) {login(account, :ok)}
    let(:mecano_profile_props) { FactoryGirl.attributes_for(:mecano_profile) }
    it "successfully creates a mecano profile" do
      pp mecano_profile_props
      create_mecano_profile(mecano_profile_props, :created)
    end
    it "doesn't create if address is missing" do
      mecano_profile_props['address'] = ''
      create_mecano_profile(mecano_profile_props, :unprocessable_entity)
    end
    it "doesn't create if city is missing" do
      mecano_profile_props['city'] = ''
      create_mecano_profile(mecano_profile_props, :unprocessable_entity)
    end
    it "doesn't create if country is missing" do
      mecano_profile_props['country'] = ''
      create_mecano_profile(mecano_profile_props, :unprocessable_entity)
    end
    it "doesn't create if pro is missing" do
      mecano_profile_props['pro'] = nil
      create_mecano_profile(mecano_profile_props, :unprocessable_entity)
    end
    it "doesn't create if mobile is missing" do
      mecano_profile_props['mobile'] = nil
      create_mecano_profile(mecano_profile_props, :unprocessable_entity)
    end
    it "doesn't create a 'pro' profile if company name is missing" do
      mecano_profile_props['pro'] = true
      mecano_profile_props['company_name'] = ''
      create_mecano_profile(mecano_profile_props, :unprocessable_entity)
    end
    it "doesn't create a 'pro' profile if price is missing" do
      mecano_profile_props['pro'] = true
      mecano_profile_props['price'] = ''
      create_mecano_profile(mecano_profile_props, :unprocessable_entity)
    end
    it "doesn't create a 'mobile' profile if radius is missing" do
      mecano_profile_props['mobile'] = true
      mecano_profile_props['radius'] = ''
      create_mecano_profile(mecano_profile_props, :unprocessable_entity)
    end
  end
end
