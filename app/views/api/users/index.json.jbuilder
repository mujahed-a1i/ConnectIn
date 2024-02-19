@users.each do |user|
    
    json.set! user.id do
        json.extract! user, :id, :email, :username, :first_name, :last_name, :created_at, :updated_at
        json.profile_pic user.profile_pic.attached? ? user.profile_pic.url : "https://connectin-fsp.s3.amazonaws.com/icons8-user-profile2.png"
        json.profile_banner user.profile_banner.attached? ? user.profile_banner.url : "https://connectin-fsp.s3.amazonaws.com/profileBannerBackground.jpeg"

    end
    


end