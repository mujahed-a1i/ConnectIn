# class ChangeFirstLastNameNullFalse < ActiveRecord::Migration[7.0]
#   def change
#     change_column :users, :first_name, :string, null: false
#     change_column :users, :last_name, :string, null: false

#   end
# end
class ChangeFirstLastNameNullFalse < ActiveRecord::Migration[7.0]
  def up
    # Update existing records with a default value or non-null value for "first_name"
    User.where(first_name: nil).update_all(first_name: "DefaultFirstName")

    # Update existing records with a default value or non-null value for "last_name"
    User.where(last_name: nil).update_all(last_name: "DefaultLastName")

    # Change column to not allow null values for "first_name"
    change_column :users, :first_name, :string, null: false

    # Change column to not allow null values for "last_name"
    change_column :users, :last_name, :string, null: false
  end

  def down
    # Revert changes if needed
    change_column :users, :first_name, :string, null: true
    change_column :users, :last_name, :string, null: true
  end
end