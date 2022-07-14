# frozen_string_literal: true

module Types
  class EventFunctionDefinitionType < Types::BaseObject
    field :id, ID, null: false
    field :quantity, Integer
    field :name, String, null: false

    def name
      object.team_function.name
    end
  end
end
