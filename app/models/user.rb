# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  email           :string           not null
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  first_name      :string           not null
#  last_name       :string           not null
#
class User < ApplicationRecord
  before_validation :ensure_session_token
  has_secure_password

  validates :username, 
    uniqueness: true, 
    length: { in: 3..40 }, 
    format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, 
    uniqueness: true, 
    length: { in: 3..100 }, 
    format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..40 }, allow_nil: true
  validates :first_name, presence: true
  validates :last_name, presence: true

  has_many :posts, dependent: :destroy
  has_many :experiences, dependent: :destroy
  has_one_attached :profile_pic, dependent: :destroy

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  def reset_session_token!
    self.session_token = generate_unique_session_token
    save!
    session_token
  end

  private

  def generate_unique_session_token
    while true
        token = SecureRandom.urlsafe_base64
        return token unless User.exists?(session_token: token)
    end
  #   self.session_token = SecureRandom.urlsafe_base64(16)

  # # Ensure the generated session_token is unique
  # while User.exists?(session_token: self.session_token)
  #   self.session_token = SecureRandom.urlsafe_base64(16)
  # end
  end

  def self.find_by_credentials(credential, password)
    if (credential =~ URI::MailTo::EMAIL_REGEXP)
      user = User.find_by(email: credential)
    else 
      user = User.find_by(username: credential)
    end
    return false unless user
    if user && user.authenticate(password)
      return user
    else
      nil
    end
  end
end
