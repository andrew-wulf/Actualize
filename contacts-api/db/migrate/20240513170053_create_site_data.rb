class CreateSiteData < ActiveRecord::Migration[7.1]
  def change
    create_table :site_data do |t|
      t.integer :visits

      t.timestamps
    end
  end
end
