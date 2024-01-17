# == Schema Information
#
# Table name: posts
#
#  id          :bigint           not null, primary key
#  author_id   :bigint           not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Post < ApplicationRecord
  validates :description, presence: true
  belongs_to :user

end
