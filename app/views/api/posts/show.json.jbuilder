json.post do 
    json.extract! @post, :id, :user_id, :description, :created_at
    json.photo @post.photo.attached? ? @post.photo.url : nil
    
    json.author do 
        json.first_name @user.first_name
        json.last_name @user.last_name
    end

end

