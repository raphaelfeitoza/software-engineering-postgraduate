# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :ping, String, null: false
    def ping
      'Pong!'
    end

    field :event_definitions, [EventDefinitionType], null: false

    def event_definitions
      EventDefinition.all
    end
  end
end
