@experiences.each do |experience|
  json.set! experience.id do 
    json.extract! experience, :id, :user_id, :company_name, :location, :description, 
    :start_date, :end_date, :created_at, :updated_at
  end
end