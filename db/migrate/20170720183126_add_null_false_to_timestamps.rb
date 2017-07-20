class AddNullFalseToTimestamps < ActiveRecord::Migration[5.0]
  def change
    change_column_null :reviews, :created_at, false
    change_column_null :reviews, :updated_at, false
    change_column_null :services, :created_at, false
    change_column_null :services, :updated_at, false
    change_column_null :recommendations, :created_at, false
    change_column_null :recommendations, :updated_at, false
    change_column_null :domains, :created_at, false
    change_column_null :domains, :updated_at, false
    change_column_null :vehicles, :created_at, false
    change_column_null :vehicles, :updated_at, false
    change_column_null :mecano_profiles, :created_at, false
    change_column_null :mecano_profiles, :updated_at, false
  end
end
