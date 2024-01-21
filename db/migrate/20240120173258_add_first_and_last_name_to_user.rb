class AddFirstAndLastNameToUser < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :first_name, :text, null: true
    add_column :users, :last_name, :text, null: true
  end
end
