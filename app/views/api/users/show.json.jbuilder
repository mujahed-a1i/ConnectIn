json.user do
  json.extract! @user, :id, :email, :username, :first_name, :last_name, :created_at, :updated_at
  json.profile_pic @user.profile_pic.attached? ? @user.profile_pic.url : nil
  json.profile_banner @user.profile_banner.attached? ? @user.profile_banner.url : nil
end


json.experiences do 
  @user.experiences do |experience|
    json.set! experience.id do
      json.extract! experience, :user_id, :title, :company_name, :location, :start_date, :end_date, :industry, :description
    end  
  end
end
