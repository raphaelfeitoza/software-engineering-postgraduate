class EventScheduledUser < ApplicationRecord
  belongs_to :event
  belongs_to :user
  belongs_to :event_function_definition
end
