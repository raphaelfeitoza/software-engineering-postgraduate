# frozen_string_literal: true

module Types
  class TeamUserFunctionType < Types::BaseObject
    field :id, ID, null: false
    field :team, TeamType, null: false

    def team
      object.team_function.team
    end

    field :team_function, TeamFunctionType, null: false
    field :user, UserType, null: false
  end
end
