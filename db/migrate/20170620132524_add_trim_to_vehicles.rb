class AddTrimToVehicles < ActiveRecord::Migration[5.0]
  def change
    add_column :vehicles, :trim, :string
  end
end
