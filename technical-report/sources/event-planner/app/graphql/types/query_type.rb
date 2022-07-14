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

    field :event_definition, EventDefinitionType, null: true,
                                                  description: 'Fetch an event definition by id' do
      argument :id, String, required: true
    end

    def event_definition(id:)
      EventDefinition.find_by(id: id)
    end

    field :users_by_event_definition, [TeamUserFunctionType],
          description: 'Fetch users that could be assigned to functions on an event' do
      argument :event_definition_id, String, required: true
      argument :team_id, String, required: false
      argument :function_id, String, required: false
    end

    def users_by_event_definition(event_definition_id:, team_id: nil, function_id: nil)
      team_function_ids = []

      if team_id.present?
        team_function_ids = if function_id.present?
                              EventFunctionDefinition.joins(:team_function)
                                                     .where(team_function: { team_id: team_id,
                                                                             id: function_id })
                                                     .pluck(:team_function_id)
                            else
                              EventFunctionDefinition.joins(:team_function)
                                                     .where(team_function: { team_id: team_id })
                                                     .pluck(:team_function_id)
                            end
      elsif function_id.present?
        team_function_ids = EventFunctionDefinition.joins(:team_function)
                                                   .where(team_function: { id: function_id })
                                                   .pluck(:team_function_id)
      else
        EventFunctionDefinition.where(event_definition_id: event_definition_id)
                               .pluck(:team_function_id)
      end

      TeamUserFunction.where(team_function_id: team_function_ids)
    end
  end
end
