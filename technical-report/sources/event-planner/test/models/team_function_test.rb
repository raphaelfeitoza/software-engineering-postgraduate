# frozen_string_literal: true

require 'test_helper'

class TeamFunctionTest < ActiveSupport::TestCase
  test "validates team association" do
    bateria = team_functions(:bateria)
    assert_equal "Baterista", bateria.name
    assert_equal "Banda", bateria.team.name
  end
end
