# typed: false
# frozen_string_literal: true

require 'test_helper'

module Types
  class EventDefinitionsQueryTest < ActiveSupport::TestCase
    test '#eventDefinitions return all event definitions' do
      result = execute(query)

      assert_equal 2, result['data']['eventDefinitions'].count
      first_event = result['data']['eventDefinitions'].first

      refute_empty first_event['id']
      refute_empty first_event['name']
      refute_empty first_event['description']
    end

    def query
      <<~GRAPHQL
        query {
          eventDefinitions
          {
            id
            name
            description
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
