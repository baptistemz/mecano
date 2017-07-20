class AddCancelReasonToServices < ActiveRecord::Migration[5.0]
  def change
    add_column :services, :cancel_reason, :string
  end
end
