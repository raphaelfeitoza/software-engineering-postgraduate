# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :password, null: false
      t.string :first_name, null: false
      t.string :last_name, null: false
      t.string :phone_number
      t.string :email

      t.timestamps
    end
  end
end
