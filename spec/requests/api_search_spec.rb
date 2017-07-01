require 'rails_helper'
require 'pp'

RSpec.describe "Search :", type: :request do
  # include_context "db_cleanup_each", :transaction
  create_mecano_profiles_for_search()
  context "at home search" do
    it "successfully creates a mecano profile" do

    end
  end
  context "5km search" do
    it "successfully creates a mecano profile" do

    end
  end
  context "50km search" do
    it "successfully creates a mecano profile" do

    end
  end
  context "domains search" do
    it "successfully creates a mecano profile" do

    end
  end
  context "vehicle_brand search" do
    it "successfully creates a mecano profile" do

    end
  end
end
