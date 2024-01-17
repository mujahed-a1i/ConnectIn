json.post do 
    json.extract! @post, :id, :user_id, :description, :created_at
end

