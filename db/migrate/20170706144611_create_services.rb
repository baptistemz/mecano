class CreateServices < ActiveRecord::Migration[5.0]
  def change
    create_table :services do |t|
      t.string :status
      t.integer :amount
      t.references :vehicle, foreign_key: true
      t.references :user, foreign_key: true
      t.references :mecano_profile, foreign_key: true
    end
  end
end
