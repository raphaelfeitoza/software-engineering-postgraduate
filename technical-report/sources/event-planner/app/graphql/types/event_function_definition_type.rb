# frozen_string_literal: true

module Types
  class EventFunctionDefinitionType < Types::BaseObject
    field :id, ID, null: false
    # field :event_definition_id, Integer, null: false
    # field :team_function_id, Integer, null: false
    field :quantity, Integer
    field :name, String, null: false
    
    def name
      object.team_function.name
    end
  end
end
