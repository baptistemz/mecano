require 'rails_helper'
require 'pp'

RSpec.describe "Service :", type: :request do
  # include_context "db_cleanup_each", :transaction
  before(:all) do
    geocode_addresses()
  end
  let(:user_props) { FactoryGirl.attributes_for_list(:user, 2) }
  let(:account) {signup(user_props[0], :ok)}
  let!(:user) {login(account, :ok)}
  let(:mecano_profile_props) { FactoryGirl.attributes_for(:mecano_profile) }
  let(:mecano_profile_1) { create_mecano_profile(mecano_profile_props, :created) }
  let(:service_props_1) {{ message: 'salut mec !', mecano_profile_id: mecano_profile_1['mecano_profile']['id'] }}
  context "service self creation //" do
    it "doesn't create self service" do
      create_service(service_props_1, :unprocessable_entity)
    end
  end
  context "service creation //" do
    # let(:user_props_2) { FactoryGirl.attributes_for_list(:user, 2) }
    # let(:account_2) {signup(user_props[1], :ok)}
    # let!(:user_2) {login(account_2, :ok)}
    # let(:mecano_profile_props_2) { FactoryGirl.attributes_for(:mecano_profile) }
    # let(:mecano_profile_2) { create_mecano_profile(mecano_profile_props, :created) }
    # let(:service_props_2) {{ message: 'salut mec !', mecano_profile_id: mecano_profile_2['id'] }}
    # it "creates valid service" do
    #   # pp user['id']
    #   create_service(service_props_2, :ok)
    # end
    # it "doesn't create the service if mecano_profile is missing" do
    #   create_service(service_props_2)
    #   # pp parsed_body
    # end
    # it "doesn't create the service if vehicle is missing" do
    # end
    # it "doesn't create the service if message is missing" do
    # end
    # it "doesn't create the service if there's already a pending service between user and mecano" do
    # end
  end
end
