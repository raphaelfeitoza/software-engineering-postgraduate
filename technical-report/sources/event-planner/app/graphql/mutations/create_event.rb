# frozen_string_literal: true

module Mutations
  class CreateEvent < BaseMutation
    
    field :event_id, ID, null: true
    field :event_definition, Types::EventDefinitionType, null: true
    field :user_errors, [Types::UserErrorType], null: true,
                                                description: 'List of errors that occurred while executing the mutation.'
    
    # TODO: define arguments
    argument :event_date, GraphQL::Types::ISO8601DateTime, required: true
    argument :event_definition_id, ID, required: true

    def resolve(event_definition_id:, event_date:)
      scheduled_event = Event.find_by(event_definition_id: event_definition_id,
                                      date: (event_date - 1.hour)..(event_date + 1.hour))

      if scheduled_event.present?
        return {
          user_errors: [Types::UserErrorType::Data.new(:event_date.to_s.camelize(:lower), "There's already an event on that date. Scheduled Event Id:#{scheduled_event.id}")]
        }
      end

      event = Event.create!(event_definition_id: event_definition_id, date: event_date)

      {
        event_id: event.id,
        event_definition: event.event_definition,
        user_errors: nil
      }
    end
  end
end
