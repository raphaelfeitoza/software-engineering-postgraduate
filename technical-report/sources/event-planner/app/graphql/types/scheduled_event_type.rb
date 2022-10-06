# frozen_string_literal: true

module Types
  class ScheduledEventType < Types::BaseObject
    field :id, ID, null: false
    field :event, EventDefinitionType, null: false
    field :date, GraphQL::Types::ISO8601DateTime, null: false
    field :end_date, GraphQL::Types::ISO8601DateTime, null: true

    def event
      object.event_definition
    end
  end
end
