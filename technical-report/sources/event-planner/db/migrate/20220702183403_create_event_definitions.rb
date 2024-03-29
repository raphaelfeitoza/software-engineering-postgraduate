# frozen_string_literal: true

class CreateEventDefinitions < ActiveRecord::Migration[7.0]
  def change
    create_table :event_definitions do |t|
      t.string :name
      t.string :description

      t.timestamps
    end
  end
end
