# frozen_string_literal: true

require 'test_helper'

class EventTest < ActiveSupport::TestCase
  test 'get evento_completo loads event_definition' do
    event = events(:evento_completo_2_julho)
    refute_empty event.event_definition.name
    refute_empty event.event_definition.description
  end
end
