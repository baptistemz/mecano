class AddTimeStampsToTables < ActiveRecord::Migration[5.0]
  def change
    add_timestamps :reviews, null: true
    add_timestamps :services, null: true
    add_timestamps :recommendations, null: true
    add_timestamps :domains, null: true
    add_timestamps :vehicles, null: true
    add_timestamps :mecano_profiles, null: true
  end
end
