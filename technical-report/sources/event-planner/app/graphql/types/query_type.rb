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

    field :event_definition, EventDefinitionType, null: true,
                                                  description: 'Fetch an event definition by id' do
      argument :id, String, required: true
    end

    def event_definition(id:)
      EventDefinition.find_by(id: id)
    end

    field :users_by_event_definition, [TeamUserFunctionType],
          resolver: Resolvers::UsersByEventDefinitionResolver,
          description: 'Fetch users that could be assigned to functions on an event' do
      argument :event_definition_id, String, required: true, validates: { allow_blank: false }
      argument :team_id, String, required: false
      argument :function_id, String, required: false
    end

    field :scheduled_event_users, [ScheduledEventUserType],
          description: 'Fetch scheduled events by user' do
      argument :user_id, String, required: true
    end

    def scheduled_event_users(user_id:); end
  end
end
