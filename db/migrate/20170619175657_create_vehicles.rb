class CreateVehicles < ActiveRecord::Migration[5.0]
  def change
    create_table :vehicles do |t|
      t.string :brand
      t.string :model
      t.integer :year
      t.references :user, foreign_key: true
    end
  end
end
