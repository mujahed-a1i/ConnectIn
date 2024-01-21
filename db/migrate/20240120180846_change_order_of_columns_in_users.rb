class ChangeOrderOfColumnsInUsers < ActiveRecord::Migration[7.0]
  def change
    # Change the order of columns as needed
    change_table :users do |t|
      t.change :first_name, :string, after: :session_token
      t.change :last_name, :string, after: :first_name
    end
  end
end
