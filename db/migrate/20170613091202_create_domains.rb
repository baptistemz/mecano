class CreateDomains < ActiveRecord::Migration[5.0]
  def change
    create_table :domains do |t|
      t.string :name
      t.string :kind
      t.references :mecano_profile, foreign_key: true
    end
  end
end
