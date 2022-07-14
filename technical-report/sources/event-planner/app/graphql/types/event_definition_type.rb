# frozen_string_literal: true

module Types
  class EventDefinitionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :description, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    field :teams, [EventTeamDefinitionType],
          description: 'Times necessários para a execução do evento'

    def teams
      team_functions = object.event_function_definition.group_by { |function| function.team_function.team }
      team_functions.map do |team_function, functions|
        TeamFunctionData.new(id: team_function.id, name: team_function.name, functions: functions)
      end
    end

    TeamFunctionData = Struct.new(:id, :name, :functions)
  end
end
