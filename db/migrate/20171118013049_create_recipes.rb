class CreateRecipes < ActiveRecord::Migration[5.1]
  def up
    create_table :recipes do |t|
      t.belongs_to :user, index:true
      t.string "recipe_id"
      t.string "title"
      t.string "image"
      t.timestamps
    end
  end

  def down
    drop_table :recipes
  end
end
