# typed: false
# frozen_string_literal: true

require 'test_helper'

module Types
  class UsersByEventDefinitionQueryTests < ActiveSupport::TestCase
    test '#usersByEventDefinition without a event_definition_id returns errors' do
      result = execute(query)
      refute_empty result['errors']
    end

    test '#usersByEventDefinition by event_definition id return all users/team/function' do
      event = event_definitions(:evento_completo)
      result = execute(query(event_definition_id: event.id))

      refute_nil result['data']['usersByEventDefinition']
      assert result['data']['usersByEventDefinition'].any?

      first_user = result['data']['usersByEventDefinition'].first

      refute_nil first_user['user']
      refute_nil first_user['team']
      refute_nil first_user['teamFunction']
    end

    test '#usersByEventDefinition by event_definition id and team_id return all users for that team' do
      event = event_definitions(:evento_completo)
      team = teams(:banda)
      result = execute(query(event_definition_id: event.id, team_id: team.id))

      result['data']['usersByEventDefinition'].each do |user|
        assert_equal team.name, user['team']['name']
      end
    end

    test '#usersByEventDefinition by event,team and function return users for that function' do
      event = event_definitions(:evento_completo)
      team = teams(:banda)
      function = team_functions(:vocal)
      result = execute(query(event_definition_id: event.id, team_id: team.id,
                             function_id: function.id))

      result['data']['usersByEventDefinition'].each do |user|
        assert_equal function.name, user['teamFunction']['name']
      end
    end

    def query(event_definition_id: nil, team_id: nil, function_id: nil)
      <<~GRAPHQL
        query {
          usersByEventDefinition(
            eventDefinitionId: "#{event_definition_id}"
            teamId: "#{team_id}"
            functionId: "#{function_id}"
          ) {
            id
            user {
              id
              username
              firstName
              lastName
            }
            team {
              id
              name
            }
            teamFunction {
              id
              name
            }
          }
        }
      GRAPHQL
    end

    def execute(query)
      EventPlannerSchema.execute(
        query: query,
        variables: {}
        # context: { current_user: "tbd"},
      ).to_h
    end
  end
end
