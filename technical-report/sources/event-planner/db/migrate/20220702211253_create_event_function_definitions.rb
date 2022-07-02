# frozen_string_literal: true

class CreateEventFunctionDefinitions < ActiveRecord::Migration[7.0]
  def change
    create_table :event_function_definitions do |t|
      t.belongs_to :event_definition, null: false, foreign_key: true
      t.belongs_to :team_function, null: false, foreign_key: true
      t.integer :quantity, limit: 2

      t.timestamps
    end
  end
end
