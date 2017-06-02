class AddIsMecanoToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :is_mecano, :boolean, default: false
  end
end
