require 'rails_helper'
require 'pp'

RSpec.describe "Integration :", type: :feature do
  context "Loads home page" do
    it "Finds app title and subtitles" do
      visit "/"
      expect(page).to have_content "Restor'itVos entretiens, montages et réparationsPar des passionnés et des professionnels proches de chez vous."
    end
  end
end
