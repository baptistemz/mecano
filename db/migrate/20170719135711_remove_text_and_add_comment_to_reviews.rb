class RemoveTextAndAddCommentToReviews < ActiveRecord::Migration[5.0]
  def change
    remove_column :reviews, :text, :text
    add_column :reviews, :comment, :text
  end
end
