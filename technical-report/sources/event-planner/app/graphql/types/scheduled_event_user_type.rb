# frozen_string_literal: true

module Types
  class ScheduledEventUserType < Types::BaseObject
    field :id, ID, null: false
    field :event_id, Integer, null: false
    field :event, EventDefinitionType, null: false
    field :user_id, Integer, null: false
    field :user, UserType, null: false

    field :event_function_definition_id, Integer, null: false
    field :function, TeamFunctionType, null: false

    def function
      object.event_function_definition.team_function
    end

    field :accepted, Boolean, null: true

    # field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    # field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
