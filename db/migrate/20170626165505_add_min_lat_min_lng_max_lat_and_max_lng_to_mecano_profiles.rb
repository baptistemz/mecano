class AddMinLatMinLngMaxLatAndMaxLngToMecanoProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :mecano_profiles, :min_lat, :float
    add_column :mecano_profiles, :min_lng, :float
    add_column :mecano_profiles, :max_lat, :float
    add_column :mecano_profiles, :max_lng, :float
  end
end
