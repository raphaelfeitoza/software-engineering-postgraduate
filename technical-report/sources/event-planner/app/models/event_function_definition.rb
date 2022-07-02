# frozen_string_literal: true

class EventFunctionDefinition < ApplicationRecord
  belongs_to :event_definition
  belongs_to :team_function
end
