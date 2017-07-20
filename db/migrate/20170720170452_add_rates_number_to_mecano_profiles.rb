class AddRatesNumberToMecanoProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :mecano_profiles, :rates_number, :integer
  end
end
