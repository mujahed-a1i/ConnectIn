@users.each do |user|
    
    json.set! user.id do
        json.extract! user, :id, :email, :username, :first_name, :last_name, :created_at, :updated_at
    end
end