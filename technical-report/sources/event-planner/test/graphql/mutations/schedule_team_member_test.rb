# typed: false
# frozen_string_literal: true

require 'test_helper'

module Types
  class ScheduleTeamMemberTest < ActiveSupport::TestCase
    # test '#resolve event doesn\'t exist return user error' do
    #   event_id = 1
    #   team_user_functions = team_user_functions(:batera_um)
    #   user_functions = [{ userId: team_user_functions.user_id, functionId: team_user_functions.team_function_id }]
    #   result = execute(
    #     schedule_team_member(event_id: event_id, user_functions: user_functions)
    #   )

    #   user_errors = result['data']['scheduleTeamMember']['userErrors']
    #   assert_equal user_errors.count, 1
    #   assert user_errors.first['message'].starts_with?('Event: 1 not found')
    # end

    # test '#resolve invalid function_id return user error' do
    #   event_id = events(:evento_completo_2_julho).id

    #   team_user_functions = team_user_functions(:batera_um)
    #   user_functions = [
    #     { userId: team_user_functions.user_id,
    #       functionId: 1 }
    #   ]
    #   result = execute(
    #     schedule_team_member(event_id: event_id, user_functions: user_functions)
    #   )

    #   user_errors = result['data']['scheduleTeamMember']['userErrors']
    #   assert_equal user_errors.count, 1
    #   assert user_errors.first['message'].starts_with?('Function: 1 not found')
    # end

    # test '#resolve invalid user_id return user error' do
    #   event_id = events(:evento_completo_2_julho).id

    #   team_user_functions = team_user_functions(:batera_um)
    #   user_functions = [
    #     { userId: 1,
    #       functionId: team_user_functions.team_function_id }
    #   ]
    #   result = execute(
    #     schedule_team_member(event_id: event_id, user_functions: user_functions)
    #   )

    #   user_errors = result['data']['scheduleTeamMember']['userErrors']
    #   assert_equal user_errors.count, 1
    #   assert user_errors.first['message'].starts_with?('User: 1 not found')
    # end

    test '#resolve already scheduled user no errors' do
      event = events(:evento_completo_2_julho)
      team_user_functions = team_user_functions(:batera_um)
      user_functions = [
        { userId: team_user_functions.user_id,
          functionId: team_user_functions.team_function_id }
      ]
      result = execute(
        schedule_team_member(event_id: event.id, user_functions: user_functions)
      )

      user_errors = result['data']['scheduleTeamMember']['userErrors']
      assert_equal user_errors.count, 0

      event_function = EventFunctionDefinition
                       .find_by(event_definition_id: event.event_definition_id,
                                team_function_id: team_user_functions.team_function_id)
      refute_nil event_function

      scheduled_user = EventScheduledUser.find_by(
        event: event,
        user: team_user_functions.user,
        function: event_function
      )

      refute_nil scheduled_user
    end

    def schedule_team_member(event_id: nil, user_functions: [])
      <<~GRAPHQL
        mutation
        {
          scheduleTeamMember(input: {eventId: "#{event_id}", userFunctions: #{user_functions.to_json.delete('\\"')}})
          {
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
