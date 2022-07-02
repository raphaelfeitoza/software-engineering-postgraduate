# frozen_string_literal: true

require 'test_helper'

class EventDefinitionTest < ActiveSupport::TestCase
  test 'get one event' do
    event = event_definitions(:one)
    assert_equal 'Evento Completo', event.name
  end
end
