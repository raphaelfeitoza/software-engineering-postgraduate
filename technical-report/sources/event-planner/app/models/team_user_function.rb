# frozen_string_literal: true

class TeamUserFunction < ApplicationRecord
  belongs_to :team_function
  belongs_to :user
end
