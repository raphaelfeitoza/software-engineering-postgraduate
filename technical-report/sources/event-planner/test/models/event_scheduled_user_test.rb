# frozen_string_literal: true

require 'test_helper'

class EventScheduledUserTest < ActiveSupport::TestCase
  test "load one event will load all associations" do
    scheduled_user = event_scheduled_users(:raphael_event_one)

    refute_nil scheduled_user.event
    refute_nil scheduled_user.user
    refute_nil scheduled_user.function
    refute_nil scheduled_user.accepted
    
  end
end
