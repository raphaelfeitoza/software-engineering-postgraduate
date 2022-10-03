# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :event_definition
  has_many :scheduled_users, class_name: 'EventScheduledUser'
end
