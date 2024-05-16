class CreateSongs < ActiveRecord::Migration[7.1]
  def change
    create_table :songs do |t|
      t.string :title
      t.string :artist
      t.string :album
      t.date :release_date
      t.integer :length
      t.string :song_url
      t.string :image_url

      t.timestamps
    end
  end
end
