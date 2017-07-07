class AddDefaultValueToServiceStatus < ActiveRecord::Migration[5.0]
  def up
    change_column :services, :status, :string, default: "pending"
  end

  def down
    change_column :services, :status, :string, default: nil
  end
end
