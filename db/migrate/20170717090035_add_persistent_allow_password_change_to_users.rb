class AddPersistentAllowPasswordChangeToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :persistent_allow_password_change, :boolean, null: false, default: false, after: :reset_password_sent_at
  end
end
