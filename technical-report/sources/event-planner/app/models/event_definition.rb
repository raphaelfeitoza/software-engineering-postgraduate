# frozen_string_literal: true

class EventDefinition < ApplicationRecord
  has_many :functions, class_name: 'EventFunctionDefinition'
end
