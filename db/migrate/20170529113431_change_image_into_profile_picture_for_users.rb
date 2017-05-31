class ChangeImageIntoProfilePictureForUsers < ActiveRecord::Migration
  def self.up
    remove_column :users, :image, :string
    change_table :users do |t|
      t.string :profile_picture
    end
  end

  def self.down
    remove_column :users, :profile_picture
    change_table :users do |t|
      t.string :image
    end
  end
end
