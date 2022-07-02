# frozen_string_literal: true

class EventDefinition < ApplicationRecord
  has_many :event_function_definition
end
