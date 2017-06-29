class AddValueToDomains < ActiveRecord::Migration[5.0]
  def change
    add_column :domains, :value, :string
  end
end
