# frozen_string_literal: true

module Mutations
  class CreateEvent < BaseMutation
    field :event_id, ID, null: true
    field :event_definition, Types::EventDefinitionType, null: true
    field :user_errors, [Types::UserErrorType],
          null: true,
          description: 'List of errors that occurred while executing the mutation.'

    argument :event_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :event_definition_id, ID, required: true

    def resolve(event_definition_id:, event_date:)
      user_errors = validate_request(event_definition_id: event_definition_id, event_date: event_date)
      return { user_errors: user_errors } if user_errors.any?

      event = Event.create!(event_definition_id: event_definition_id, date: event_date)
      {
        event_id: event.id,
        event_definition: event.event_definition,
        user_errors: nil
      }
    end

    private

    def validate_request(event_definition_id:, event_date:)
      scheduled_event = find_event_by_date(event_definition_id: event_definition_id, event_date: event_date)

      return [] unless scheduled_event.present?

      [Types::UserErrorType::Data.new(:event_date.to_s.camelize(:lower),
                                      "There's already an event on that date. Event Id:#{scheduled_event.id}")]
    end

    def find_event_by_date(event_definition_id:, event_date:)
      Event.find_by(event_definition_id: event_definition_id, date: (event_date - 1.hour)..(event_date + 1.hour))
    end
  end
end
