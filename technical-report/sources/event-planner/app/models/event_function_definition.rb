# frozen_string_literal: true

class EventFunctionDefinition < ApplicationRecord
  belongs_to :event_definition
  belongs_to :function, class_name: 'TeamFunction', foreign_key: 'team_function_id'
end
