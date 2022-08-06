# typed: false
# frozen_string_literal: true

require 'test_helper'

module Types
  class EventDefinitionsQueryTest < ActiveSupport::TestCase
    test '#eventDefinition returns evento completo' do
      event = event_definitions(:evento_completo)
      result = execute(query_by_id(event_id: event.id))

      refute_nil result['data']['eventDefinition']
      event = result['data']['eventDefinition']

      refute_empty event['name']
      refute_empty event['description']

      assert_equal 2, event['teams'].count

      first_team = result['data']['eventDefinition']['teams'].first
      assert_equal 5, first_team['functions'].count
    end

    def query_by_id(event_id:)
      <<~GRAPHQL
        query {
          eventDefinition(id: "#{event_id}")
          {
            id
            name
            description
            teams
            {
              name
              functions
              {
                name
                quantity
              }
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
