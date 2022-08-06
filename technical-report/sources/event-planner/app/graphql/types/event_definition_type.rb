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
      team_functions = object.functions.group_by { |function| function.function.team }

      team_functions.map do |team, functions|
        TeamFunctionData.new(team.id, team.name, functions)
      end
    end

    TeamFunctionData = Struct.new(:id, :name, :functions)
  end
end
