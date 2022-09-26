# frozen_string_literal: true

module Resolvers
  class UsersByEventDefinitionResolver < Resolvers::Base
    type [Types::TeamUserFunctionType], null: true

    def resolve(event_definition_id:, team_id: nil, function_id: nil)
      team_function_ids = team_function_ids(event_definition_id: event_definition_id, team_id: team_id,
                                            function_id: function_id)

      TeamUserFunction.where(team_function_id: team_function_ids)
    end

    private

    def team_function_ids(event_definition_id:, team_id: nil, function_id: nil)
      if team_id.present?
        if function_id.present?
          team_function_ids_by_team_function_id(team_id: team_id, function_id: function_id)
        else
          team_function_ids_by_team_id(team_id: team_id)
        end
      elsif function_id.present?
        team_function_ids_by_function_id(function_id: function_id)
      else
        team_function_ids_by_event_definition_id(event_definition_id: event_definition_id)
      end
    end

    def team_function_ids_by_team_function_id(team_id:, function_id:)
      EventFunctionDefinition.joins(:function)
                             .where(function: { team_id: team_id,
                                                id: function_id })
                             .pluck(:team_function_id)
    end

    def team_function_ids_by_team_id(team_id:)
      EventFunctionDefinition.joins(:function)
                             .where(function: { team_id: team_id })
                             .pluck(:team_function_id)
    end

    def team_function_ids_by_function_id(function_id:)
      EventFunctionDefinition.joins(:team_function)
                             .where(team_function: { id: function_id })
                             .pluck(:team_function_id)
    end

    def team_function_ids_by_event_definition_id(event_definition_id:)
      EventFunctionDefinition.where(event_definition_id: event_definition_id)
                             .pluck(:team_function_id)
    end
  end
end
