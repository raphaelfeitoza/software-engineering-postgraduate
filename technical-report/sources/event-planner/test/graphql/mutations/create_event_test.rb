# typed: false
# frozen_string_literal: true

require 'test_helper'

module Types
  class CreateEventTest < ActiveSupport::TestCase
    test '#resolve event for the same date returns user errors' do
      event_definition = event_definitions(:evento_completo)
      scheduled_event = Event.find_by(event_definition_id: event_definition.id)
      result = execute(create_event_mutation(start_date: scheduled_event.date,
                                             end_date: scheduled_event.end_date,
                                             event_definition_id: event_definition.id))

      user_errors = result['data']['createEvent']['userErrors']
      assert_equal user_errors.count, 1
      assert user_errors.first['message'].starts_with?("There's already an event on that date")
    end

    test '#resolve event for the same date returns user errors' do
      event_definition = event_definitions(:evento_completo)
      scheduled_event = Event.find_by(event_definition_id: event_definition.id)
      result = execute(create_event_mutation(start_date: scheduled_event.end_date,
                                             end_date: scheduled_event.date,
                                             event_definition_id: event_definition.id))

      user_errors = result['data']['createEvent']['userErrors']
      assert_equal user_errors.count, 1
      assert user_errors.first['message'].starts_with?('The start date must be before the end date.')
    end

    [60.minutes, -60.minutes, 50.minutes]
      .each do |time_to_add|
      test "#resolve event for the same date + #{time_to_add} hour returns new event" do
        event_definition = event_definitions(:evento_completo)
        scheduled_event = Event.find_by(event_definition_id: event_definition.id)
        result = execute(create_event_mutation(start_date: scheduled_event.date + time_to_add,
                                               end_date: scheduled_event.end_date,
                                               event_definition_id: event_definition.id))
        user_errors = result['data']['createEvent']['userErrors']
        assert_equal user_errors.count, 1
        assert user_errors.first['message'].starts_with?("There's already an event on that date")
      end
    end

    test '#resolve new event after 1 hour of previous event returns created event' do
      event_definition = event_definitions(:evento_completo)
      scheduled_event = Event.find_by(event_definition_id: event_definition.id)
      result = execute(create_event_mutation(start_date: scheduled_event.end_date + 1.hours + 1.minute,
                                             end_date: scheduled_event.end_date + 2.hours,
                                             event_definition_id: event_definition.id))
      # binding.pry

      user_errors = result['data']['createEvent']['userErrors']
      refute user_errors.present?
      assert_equal result['data']['createEvent']['eventDefinition']['id'], event_definition.id.to_s
      assert result['data']['createEvent']['eventId'].present?
    end

    def create_event_mutation(event_definition_id:, start_date:, end_date:)
      <<~GRAPHQL
        mutation
        {
          createEvent(input:
            { eventDefinitionId:"#{event_definition_id}",
              startDate: "#{start_date.to_time.iso8601}",
              endDate:  "#{end_date.to_time.iso8601}"}
          )
          {
            eventId
            eventDefinition
            {
              id
              name
            }
            userErrors
            {
              field
              message
            }
          }
        }
      GRAPHQL
    end

    def execute(query)
      EventPlannerSchema.execute(
        query: query,
        variables: {}
        # context: { current_user: "tbd"},
      ).to_h
    end
  end
end
