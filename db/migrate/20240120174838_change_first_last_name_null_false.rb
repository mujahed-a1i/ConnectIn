class ChangeFirstLastNameNullFalse < ActiveRecord::Migration[7.0]
  def change

    User.where(first_name: nil).update_all(first_name: "DefaultFirstName")
    User.where(first_name: nil).update_all(last_name: "DefaultLastName")
    change_column :users, :first_name, :string, null: false
    change_column :users, :last_name, :string, null: false

  end
end
