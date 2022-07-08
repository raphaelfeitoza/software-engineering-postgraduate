# typed: false
# frozen_string_literal: true

require 'test_helper'

class GraphqlControllerTest < ActionController::TestCase
  test 'ping query' do
    ping_query = <<~STRING
      query {
          ping
        }
    STRING

    execute_graphql_query ping_query
    assert_response :ok
    assert_equal expected_response, parsed_body
  end

  private

  def expected_response
    {
      'data' => {
        'ping' => 'Pong!'
      }
    }
  end

  def parsed_body
    JSON.parse(response.body)
  end

  def execute_graphql_query(query)
    post(:execute, params: {
           query: query
         })
  end
end
