# == Schema Information
#
# Table name: experiences
#
#  id           :bigint           not null, primary key
#  title        :string           not null
#  company_name :string           not null
#  location     :string
#  start_date   :date             not null
#  end_date     :date
#  industry     :string           not null
#  description  :text
#  user_id      :bigint           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Experience < ApplicationRecord
  validates :title, :company_name, :start_date, :industry, presence: true
  # validate :end_date_after_start_date, if: -> { end_date.present? }
  # validates :title, :company_name, :start_date, :industry, presence: true
  belongs_to :user

  private

  def end_date_after_start_date
    if end_date <= start_date
      errors.add(:end_date, "must be after the start date")
    end
  end
end
