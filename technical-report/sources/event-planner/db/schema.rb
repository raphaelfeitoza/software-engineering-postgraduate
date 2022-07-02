# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 20_220_702_213_001) do
  create_table 'event_definitions', charset: 'utf8mb3', force: :cascade do |t|
    t.string 'name'
    t.string 'description'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'event_function_definitions', charset: 'utf8mb3', force: :cascade do |t|
    t.bigint 'event_definition_id', null: false
    t.bigint 'team_function_id', null: false
    t.integer 'quantity', limit: 2
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['event_definition_id'], name: 'index_event_function_definitions_on_event_definition_id'
    t.index ['team_function_id'], name: 'index_event_function_definitions_on_team_function_id'
  end

  create_table 'event_scheduled_users', charset: 'utf8mb3', force: :cascade do |t|
    t.bigint 'event_id', null: false
    t.bigint 'user_id', null: false
    t.bigint 'event_function_definition_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['event_function_definition_id'], name: 'index_event_scheduled_users_on_event_function_definition_id'
    t.index ['event_id'], name: 'index_event_scheduled_users_on_event_id'
    t.index ['user_id'], name: 'index_event_scheduled_users_on_user_id'
  end

  create_table 'events', charset: 'utf8mb3', force: :cascade do |t|
    t.bigint 'event_definition_id', null: false
    t.datetime 'date'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['event_definition_id'], name: 'index_events_on_event_definition_id'
  end

  create_table 'team_functions', charset: 'utf8mb3', force: :cascade do |t|
    t.bigint 'team_id', null: false
    t.string 'name', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['team_id'], name: 'index_team_functions_on_team_id'
  end

  create_table 'team_user_functions', charset: 'utf8mb3', force: :cascade do |t|
    t.bigint 'team_function_id', null: false
    t.bigint 'user_id', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['team_function_id'], name: 'index_team_user_functions_on_team_function_id'
    t.index ['user_id'], name: 'index_team_user_functions_on_user_id'
  end

  create_table 'teams', charset: 'utf8mb3', force: :cascade do |t|
    t.string 'name', null: false
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'users', charset: 'utf8mb3', force: :cascade do |t|
    t.string 'username', null: false
    t.string 'password', null: false
    t.string 'first_name', null: false
    t.string 'last_name', null: false
    t.string 'phone_number'
    t.string 'email'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  add_foreign_key 'event_function_definitions', 'event_definitions'
  add_foreign_key 'event_function_definitions', 'team_functions'
  add_foreign_key 'event_scheduled_users', 'event_function_definitions'
  add_foreign_key 'event_scheduled_users', 'events'
  add_foreign_key 'event_scheduled_users', 'users'
  add_foreign_key 'events', 'event_definitions'
  add_foreign_key 'team_functions', 'teams'
  add_foreign_key 'team_user_functions', 'team_functions'
  add_foreign_key 'team_user_functions', 'users'
end
