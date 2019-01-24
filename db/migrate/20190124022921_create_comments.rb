class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :title
      t.text :body
      t.references :commentable
      t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
