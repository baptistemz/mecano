class CancelLastMigration < ActiveRecord::Migration[5.0]
  def change
    change_column_default :mecano_profiles, :wall_picture, nil
  end
end
