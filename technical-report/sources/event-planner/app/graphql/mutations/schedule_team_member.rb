# frozen_string_literal: true

module Mutations
  class ScheduleTeamMember < BaseMutation
    # '{"data":{"attributes":{"team_id":4284355,"team_position_name":"Drums","people_ids":["85737148"]}}}' \

    field :user_errors, [Types::UserErrorType],
          null: false,
          description: 'List of errors that occurred while executing the mutation.'

    argument :event_id, String, required: true
    argument :user_functions, [Types::UserFunctionInputType], required: true

    # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    def resolve(event_id:, user_functions:)
      event = Event.where(id: event_id).first

      if event.nil?
        return {
          user_errors: [
            Types::UserErrorType::Data.new(:event_id.to_s.camelize(:lower),
                                           "Event: #{event_id} not found")
          ]
        }
      end

      user_errors = []

      user_functions.each do |user_function|
        user = User.where(id: user_function.user_id).first
        if user.nil?
          user_errors << Types::UserErrorType::Data.new(:user_id.to_s.camelize(:lower),
                                                        "User: #{user_function.user_id} not found")
        end

        function = EventFunctionDefinition.where(
          team_function_id: user_function.function_id,
          event_definition_id: event.event_definition_id
        ).first

        if function.nil?
          user_errors << Types::UserErrorType::Data.new(:function_id.to_s.camelize(:lower),
                                                        "Function: #{user_function.function_id} not found")
        end

        EventScheduledUser.find_or_create_by(event_id: event.id,
                                             user_id: user.id,
                                             event_function_definition_id: function.id)
      end

      {
        user_errors: user_errors
      }
    end
    # rubocop:enable Metrics/MethodLength, Metrics/AbcSize
  end
end
