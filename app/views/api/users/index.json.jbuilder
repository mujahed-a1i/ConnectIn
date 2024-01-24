@users.each do |user|
    
    json.set! user.id do
        json.extract! user, :id, :email, :username, :first_name, :last_name, :created_at, :updated_at
        json.profile_pic @post.profile_pic.attached? ? @post.profile_pic.url : nil
    end
end