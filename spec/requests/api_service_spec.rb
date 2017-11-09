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
end
