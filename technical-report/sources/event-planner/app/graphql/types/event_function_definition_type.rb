# frozen_string_literal: true

module Types
  class EventFunctionDefinitionType < Types::BaseObject
    field :id, ID, null: false
    field :quantity, Integer
    field :name, String, null: false

    def name
      object.function.name
    end

    field :function_id, ID, null: false

    def function_id 
      object.function.id
    end
  end
end
