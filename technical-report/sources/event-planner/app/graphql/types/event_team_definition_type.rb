# frozen_string_literal: true

module Types
  class EventTeamDefinitionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false

    field :functions, [EventFunctionDefinitionType], null: false
  end
end
