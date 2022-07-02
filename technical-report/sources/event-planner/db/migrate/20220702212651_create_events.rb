# frozen_string_literal: true

class CreateEvents < ActiveRecord::Migration[7.0]
  def change
    create_table :events do |t|
      t.belongs_to :event_definition, null: false, foreign_key: true
      t.datetime :date

      t.timestamps
    end
  end
end
