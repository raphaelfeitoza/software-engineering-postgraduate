# frozen_string_literal: true

class CreateTeamFunctions < ActiveRecord::Migration[7.0]
  def change
    create_table :team_functions do |t|
      t.belongs_to :team, null: false, foreign_key: true
      t.string :name, null: false

      t.timestamps
    end
  end
end
