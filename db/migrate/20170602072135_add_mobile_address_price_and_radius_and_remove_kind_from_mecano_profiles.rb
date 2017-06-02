class AddMobileAddressPriceAndRadiusAndRemoveKindFromMecanoProfiles < ActiveRecord::Migration[5.0]
  def change
    add_column :mecano_profiles, :mobile, :boolean
    add_column :mecano_profiles, :address, :string
    add_column :mecano_profiles, :radius, :integer
    add_column :mecano_profiles, :price, :integer
    remove_column :mecano_profiles, :kind, :string
  end
end
