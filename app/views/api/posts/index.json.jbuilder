@posts.each do |post|
  json.set! post.id do
    json.id post.id
    json.user_id post.user_id
    json.description post.description
    json.photo post.photo.attached? ? post.photo.url : nil
    json.author do 
    json.first_name post.user.first_name
    json.last_name post.user.last_name
    end
  end

  
    

  
end