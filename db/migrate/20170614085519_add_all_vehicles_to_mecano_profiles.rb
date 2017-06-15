class AddAllVehiclesToMecanoProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :mecano_profiles, :all_vehicles, :boolean
  end
end
