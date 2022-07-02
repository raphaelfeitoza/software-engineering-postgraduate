# frozen_string_literal: true

require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "get user from fixture" do
    user = users(:raphael)
    assert_equal  "Raphael", user.first_name
    assert_equal  "Das Batera", user.last_name
    assert_equal "raphael@email.com", user.email
    assert_equal "558588888888", user.phone_number
  end
end
