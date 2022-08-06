# frozen_string_literal: true

require 'test_helper'

class EventDefinitionTest < ActiveSupport::TestCase
  test 'get evento_completo' do
    event = event_definitions(:evento_completo)
    refute_empty event.name
    refute_empty event.description
  end
end
