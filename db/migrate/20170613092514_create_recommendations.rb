class CreateRecommendations < ActiveRecord::Migration[5.0]
  def change
    create_table :recommendations do |t|
      t.references :mecano_profile, foreign_key: true
      t.references :user, foreign_key: true      
      t.references :domain, foreign_key: true
    end
  end
end
