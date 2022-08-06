# frozen_string_literal: true

class EventScheduledUser < ApplicationRecord
  belongs_to :event
  belongs_to :user
  belongs_to :function, class_name: "EventFunctionDefinition", 
    foreign_key: "event_function_definition_id"
end
