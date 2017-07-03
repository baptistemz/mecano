require 'rails_helper'
require 'pp'

RSpec.describe "Search :", type: :request do
  # include_context "db_cleanup_each", :transaction
  before(:all) do
    geocode_addresses()
  end
  let(:user_props) { FactoryGirl.attributes_for(:user) }
  let(:account) {signup(user_props, :ok)}
  let!(:user) {login(account, :ok)}
  let(:mecano_profile_props) { FactoryGirl.attributes_for(:mecano_profile) }
  let(:mecano_profile_props) { FactoryGirl.attributes_for(:mecano_profile) }
  context "at home search" do
    it "receives mobile mecanos" do
      mecano_profile_props['mobile'] = true
      mecano_profile_props['radius'] = 20
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      search(
        { full_address:"20 Avenue Foch, Marcq-en-Baroeul, France", distance: "0" },
        true
      )
    end
    it "doesn't receive non mobile mecanos" do
      mecano_profile_props["mobile"] = false
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      search(
        { full_address:"20 Avenue Foch, Marcq-en-Baroeul, France", distance: "0" },
        false
      )
    end
    it "doesn't receive mecanos further than their radius" do
      mecano_profile_props["mobile"] = true
      mecano_profile_props["radius"] = 3
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      search(
        { full_address:"20 Avenue Foch, Marcq-en-Baroeul, France", distance: "0" },
        false
      )
    end
  end
  context "5km search" do
    it "receives mecanos closer than 5km" do
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      search(
        { full_address:"200 boulevard Vauban , Lille, France", distance: "5" },
        true
      )
    end
    it "receives mobile mecanos closer than 5km" do
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      mecano_profile["mobile"] = true
      mecano_profile["radius"] = 30
      search(
        { full_address:"200 boulevard Vauban , Lille, France", distance: "5" },
        true
      )
    end
    it "doesn't receive mecanos further than 5km" do
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      search(
        { full_address:"20 Avenue Foch, Marcq-en-Baroeul, France", distance: "5" },
        false
      )
    end
  end
  context "50km search" do
    it "receives mecanos closer than 50km" do
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      search(
        { full_address:"200 boulevard Vauban , Lille, France", distance: "5" },
        true
      )
    end
    it "doesn't receive mecanos further than 50km" do
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      search(
        { full_address:"200 Avenue Mozart, Paris, France", distance: "5" },
        false
      )
    end
  end
  context "vehicle_brand search" do
    it "receives mecanos who have registered the vehicle brand searched" do
      mecano_profile_props["all_vehicles"] = false
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      domains = register_domains([{"kind" => "car_make", "value" => "audi"}], mecano_profile["id"])
      search(
        { full_address:"200 boulevard Vauban , Lille, France", distance: "5", vehicle: "audi" },
        true
      )
    end
    it "receives mecanos who work on all_vehicles" do
      mecano_profile_props["all_vehicles"] = true
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      domains = register_domains([{"kind" => "technical_skill", "value" => "wheels"}], mecano_profile["id"])
      search(
        { full_address:"200 boulevard Vauban , Lille, France", distance: "5", vehicle: "audi" },
        true
      )
    end
    it "doesn't receive mecanos who have not registered the vehicle brand searched" do
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      search(
        { full_address:"200 boulevard Vauban , Lille, France", distance: "5", vehicle: "audi" },
        false
      )
    end
  end
  context "domains search" do
    it "receives mecanos mastering searched domains" do
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      domains = register_domains([{"kind" => "technical_skill", "value" => "wheels"}, {"kind" => "technical_skill", "value" => "brakes"}, {"kind" => "technical_skill", "value" => "exhaust"}], mecano_profile["id"])
      search(
        { full_address:"200 boulevard Vauban , Lille, France", distance: "5", domains: ["wheels", "brakes"] },
        true
      )
    end
    it "doesn't receive mecanos not mastering searched domains" do
      mecano_profile = create_mecano_profile(mecano_profile_props, :created)
      domains = register_domains([{"kind" => "technical_skill", "value" => "wheels"}, {"kind" => "technical_skill", "value" => "exhaust"}], mecano_profile["id"])
      search(
        { full_address:"200 boulevard Vauban , Lille, France", distance: "5", domains: ["wheels", "brakes"] },
        false
      )
    end
  end
end
