class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.references :user, foreign_key: true, index: true, null: false
      t.text :description, null: false
      t.timestamps
    end
  end
end
