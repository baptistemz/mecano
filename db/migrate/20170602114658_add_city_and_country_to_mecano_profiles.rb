class AddCityAndCountryToMecanoProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :mecano_profiles, :city, :string
    add_column :mecano_profiles, :country, :string
  end
end
