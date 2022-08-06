# frozen_string_literal: true

require 'test_helper'

class EventFunctionDefinitionTest < ActiveSupport::TestCase
  test 'event definition for evento_completo loads all function definitions' do
    event = event_definitions(:evento_completo)
    assert_equal 8, event.functions.count
  end

  test 'load one_functions_bateria can navigate to event and function definition' do
    event_function = event_function_definitions(:one_functions_bateria)

    refute_nil event_function.event_definition
    refute_nil event_function.function
  end
end
