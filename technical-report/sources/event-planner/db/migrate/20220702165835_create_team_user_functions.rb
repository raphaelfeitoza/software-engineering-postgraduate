# frozen_string_literal: true

class CreateTeamUserFunctions < ActiveRecord::Migration[7.0]
  def change
    create_table :team_user_functions do |t|
      t.belongs_to :team_function, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
