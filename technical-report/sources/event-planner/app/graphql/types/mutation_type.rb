# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :create_event, mutation: Mutations::CreateEvent

    field :schedule_team_member, mutation: Mutations::ScheduleTeamMember
  end
end
