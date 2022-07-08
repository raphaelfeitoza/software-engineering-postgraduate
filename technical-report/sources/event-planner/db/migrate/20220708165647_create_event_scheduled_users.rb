class CreateEventScheduledUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :event_scheduled_users do |t|
      t.belongs_to :event, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :event_function_definition, null: false, foreign_key: true
      t.boolean :accepted

      t.timestamps
    end
  end
end
