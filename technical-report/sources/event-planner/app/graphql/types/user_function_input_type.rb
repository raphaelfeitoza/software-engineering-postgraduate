# frozen_string_literal: true

module Types
  class UserFunctionInputType < Types::BaseInputObject
    description 'Attributes for scheduling a user to an event'

    argument :user_id, ID, required: true,
                           description: 'Id of a user'
    argument :function_id, ID, required: true,
                               description: 'Id of a function in that event'
  end
end
