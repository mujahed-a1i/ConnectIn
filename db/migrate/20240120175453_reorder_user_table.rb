class ReorderUserTable < ActiveRecord::Migration[7.0]
  def down
    change_column :user, :first_name, :string, :after => :password
  end
end
