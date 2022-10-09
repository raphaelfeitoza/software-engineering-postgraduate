# frozen_string_literal: true

module Mutations
  class CreateEvent < BaseMutation
    field :event_id, ID, null: true
    field :event_definition, Types::EventDefinitionType, null: true
    field :user_errors, [Types::UserErrorType],
          null: true,
          description: 'List of errors that occurred while executing the mutation.'

    argument :start_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :end_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :event_definition_id, ID, required: true

    def resolve(event_definition_id:, start_date:, end_date:)
      user_errors = validate_request(event_definition_id: event_definition_id, start_date: start_date,
                                     end_date: end_date)
      return { user_errors: user_errors } if user_errors.any?

      event = Event.create!(event_definition_id: event_definition_id, date: start_date, end_date: end_date)
      {
        event_id: event.id,
        event_definition: event.event_definition,
        user_errors: nil
      }
    end

    private

    def validate_request(event_definition_id:, start_date:, end_date:)
      scheduled_event = find_event_by_date(event_definition_id: event_definition_id, start_date: start_date,
                                           end_date: end_date)

      return [] unless scheduled_event.present?

      if end_date <= start_date
        return [Types::UserErrorType::Data.new(:start_date.to_s.camelize(:lower),
                                               'The start date must be before the end date.')]
      end

      [Types::UserErrorType::Data.new(:start_date.to_s.camelize(:lower),
                                      "There's already an event on that date. Event Id:#{scheduled_event.id}")]
    end

    def find_event_by_date(event_definition_id:, start_date:, end_date:)
      query = <<-SQL
      event_definition_id = :event_definition_id
        AND
       (
          (date between :start_date_low and :start_date_high) OR
          (end_date between :start_date_low and :start_date_high) OR
          (date between :end_date_low and :end_date_high) OR
          (end_date between :end_date_low and :end_date_high)
       )
      SQL

      Event.find_by(query,
                    {
                      event_definition_id: event_definition_id,
                      start_date_low: start_date - 1.hour,
                      start_date_high: start_date + 1.hour,
                      end_date_low: end_date - 1.hour,
                      end_date_high: end_date + 1.hour
                    })
    end
  end
end
