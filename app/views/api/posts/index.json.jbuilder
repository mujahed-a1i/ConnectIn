@posts.each do |post|
  json.set! post.id do
    json.id post.id
    json.user_id = post.user_id
    json.description post.description
  end
end