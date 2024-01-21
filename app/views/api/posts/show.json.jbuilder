json.post do 
    json.extract! @post, :id, :user_id, :description, :created_at
    json.media_attached @post.photo.attached? ? post.photo.url : nil
end

