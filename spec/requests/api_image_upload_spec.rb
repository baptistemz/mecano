require 'rails_helper'

RSpec.describe "ApiImageUpload", type: :request do
  # include_context "db_cleanup_each", :transaction
  context "update image" do
    let(:user_props) { FactoryGirl.attributes_for(:user) }
    let(:account) {signup(user_props, :ok)}
    let!(:user) {login(account, :ok)}
    it "successfully updates a user with new image" do
      profile_picture_params = { profile_picture: "data:image/jpeg;base64,#{Base64.encode64(File.read('spec/factories/images/avatar.jpeg'))}" }
      put api_user_registration_path, params: profile_picture_params, headers: access_tokens
      expect(response).to have_http_status(:ok)
    end
  end
  context "image updated" do
    let(:user_props) { FactoryGirl.attributes_for(:user) }
    let(:account) {signup(user_props, :ok)}
    let!(:user) {login(account, :ok)}
    let!(:update_response) {updateImage()}
    let!(:updated_user) {getUser()}
    it "keeps the original version" do
      expect(updated_user["data"]["profile_picture"]["url"]).not_to be_empty
    end
    it "generates thumb version in 100x100px" do
      expect(updated_user["data"]["profile_picture"]["thumb"]["url"]).to include("h_100,w_100")
    end
    it "generates medium version in 300x300px" do
      expect(updated_user["data"]["profile_picture"]["medium"]["url"]).to include("h_300,w_300")
    end
    #   # it "generates medium version" do
    #   #   put api_user_registration_path, profile_picture_params
    #   #   expect(response).to have_http_status(:ok)
    #   #   payload = parsed_body
    #   #   expect(payload).to include("profile_picture"=>"success")
    #   # end
  end
end
