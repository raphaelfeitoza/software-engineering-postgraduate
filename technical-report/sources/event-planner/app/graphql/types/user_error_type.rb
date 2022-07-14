# frozen_string_literal: true

module Types
  class UserErrorType < Types::BaseObject
    description 'Errors which prevented a mutation from operating'

    field :field, type: String, null: false,
                  description: 'Path to input field which caused the error'

    field :message, type: String, null: false,
                    description: 'The error message'

    Data = Struct.new(:field, :message)
  end
end
