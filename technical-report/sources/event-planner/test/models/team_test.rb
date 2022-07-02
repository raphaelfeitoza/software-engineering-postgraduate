# frozen_string_literal: true

require 'test_helper'

class TeamTest < ActiveSupport::TestCase
  test "get banda " do
    banda = teams(:banda)
    assert_equal "Banda", banda.name
  end

  test "gets all teams" do
    all_teams = Team.all
    assert_equal 3, all_teams.count
  end
end
