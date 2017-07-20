class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :mark
      t.text :text
      t.references :service, foreign_key: true
      t.references :mecano_profile, foreign_key: true
      t.references :user, foreign_key: true
    end
  end
end
