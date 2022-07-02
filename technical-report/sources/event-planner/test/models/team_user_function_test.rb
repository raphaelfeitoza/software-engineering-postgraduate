require "test_helper"

class TeamUserFunctionTest < ActiveSupport::TestCase
  test "validates association with teams and team_function" do
    team_user_function = team_user_functions(:batera_um)
    assert_equal "Baterista", team_user_function.team_function.name
    assert_equal "Banda", team_user_function.team_function.team.name
    assert_equal "Raphael", team_user_function.user.first_name
  end
end
