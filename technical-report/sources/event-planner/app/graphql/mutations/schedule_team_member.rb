# frozen_string_literal: true

module Mutations
  class ScheduleTeamMember < BaseMutation
    # '{"data":{"attributes":{"team_id":4284355,"team_position_name":"Drums","people_ids":["85737148"]}}}' \

    # TODO: define return fields
    # field :post, Types::PostType, null: false
    field :user_errors, [Types::UserErrorType], null: false,
                                                description: 'List of errors that occurred while executing the mutation.'

    # TODO: define arguments
    argument :event_id, String, required: true
    argument :user_functions, [Types::UserFunctionInputType], required: true

    # TODO: define resolve method
    def resolve(event_id:, user_functions:)
      event = Event.find_by(event_id)

      if event.nil?
        {
          user_errors: [Types::UserErrorType::Data.new(:event_id.to_s.camelize(:lower), "Event definition not found")]

        }
      end
    end
  end
end
