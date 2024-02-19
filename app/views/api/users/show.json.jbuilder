json.user do
  json.extract! @user, :id, :email, :username, :first_name, :last_name, :created_at, :updated_at
  json.profile_pic @user.profile_pic.attached? ? @user.profile_pic.url : "https://connectin-fsp.s3.amazonaws.com/user_icon.png"
  json.profile_banner @user.profile_banner.attached? ? @user.profile_banner.url : "https://connectin-fsp.s3.amazonaws.com/profileBannerBackground.jpeg"

end

# json.experience @user.experiences ? @user.experiences : nil


json.experiences do 
  @user.experiences.each do |experience|
    json.set! experience.id do
      json.extract! experience, :id, :user_id, :title, :company_name, :location, 
        :start_date, :end_date, :industry, :description, :created_at
    end  
  end
end

