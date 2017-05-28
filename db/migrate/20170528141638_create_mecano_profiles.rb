class CreateMecanoProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :mecano_profiles do |t|
      t.references :user, foreign_key: true
      t.boolean :pro
      t.string :company_name
      t.string :wall_picture
      t.string :kind
      t.float :rating
    end
  end
end
