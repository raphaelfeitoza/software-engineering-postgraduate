# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField
    field :ping, String, null: false
    def ping
      'Pong!'
    end

    field :event_definitions, [EventDefinitionType], null: false

    def event_definitions
      EventDefinition.all
    end

    field :event_definition, EventDefinitionType,
          null: true, description: 'Fetch an event definition by id' do
      argument :id, ID, required: true
    end

    def event_definition(id:)
      EventDefinition.find_by(id: id)
    end

    field :users_by_event_definition, [TeamUserFunctionType],
          resolver: Resolvers::UsersByEventDefinitionResolver,
          description: 'Fetch users that could be assigned to functions on an event' do
      argument :event_definition_id, ID, required: true, validates: { allow_blank: false }
      argument :team_id, ID, required: false
      argument :function_id, ID, required: false
    end

    field :scheduled_events, [ScheduledEventType],
          description: 'Fetch scheduled events' do
      argument :id, ID, required: false
      argument :event_type, ID, required: false
      argument :start_date, GraphQL::Types::ISO8601DateTime, required: false
      argument :end_date, GraphQL::Types::ISO8601DateTime, required: false
      argument :user_id, ID, required: false
    end

    def scheduled_events(id: nil, event_type: nil, start_date: nil, end_date: nil, user_id: nil)
      return Event.where(id: id) if id.present?

      events = Event.all
      events = events.where(event_definition_id: event_type) if event_type.present?
      events = events.where('date >= :start_date', { start_date: start_date }) if start_date.present?
      events = events.where('end_date <= :end_date', { end_date: end_date }) if end_date.present?
      events = events.joins(:scheduled_users).where(scheduled_users: { user_id: user_id }) if user_id.present?
      events
    end
  end
end
