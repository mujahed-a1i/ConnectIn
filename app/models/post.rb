# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Post < ApplicationRecord
  validate :ensure_content
  validates :description, presence: true, length: { maximum: 3000 }
  belongs_to :user
  has_one_attached :photo, dependent: :destroy

  def ensure_content
    unless self.description.length > 0 || self.media.attached?
      errors.add(:post, "Post mush have description or photo")
    end
  end

end
