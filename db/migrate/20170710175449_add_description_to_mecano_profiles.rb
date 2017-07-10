class AddDescriptionToMecanoProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :mecano_profiles, :description, :text
  end
end
