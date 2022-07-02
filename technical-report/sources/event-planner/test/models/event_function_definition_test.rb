# frozen_string_literal: true

require 'test_helper'

class EventFunctionDefinitionTest < ActiveSupport::TestCase
  test 'load' do
    event = event_definitions(:one)
    assert_equal 8, event.event_function_definition.count
  end
end
