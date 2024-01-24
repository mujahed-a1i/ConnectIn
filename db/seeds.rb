require "open-uri"

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

  puts "Destroying tables..."
  # Unnecessary if using `rails db:seed:replant`
  User.destroy_all
  Post.destroy_all

  puts "Resetting primary keys..."
  # For easy testing, so that after seeding, the first `User` has `id` of 1
  ApplicationRecord.connection.reset_pk_sequence!('users')
  ApplicationRecord.connection.reset_pk_sequence!('posts')

  puts "Creating users..."
  # Create one user with an easy to remember username, email, and password:
  User.create!(
    username: 'demo-lition', 
    email: 'demo@user.io', 
    password: 'password',
    first_name: 'Demo',
    last_name: 'Lition'

  )

  # More users
  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password',
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name
    }) 
  end

  post1 = Post.create!(
    user_id: 1,
    description: "Just joined ConnectIn!!!."
  )

  post1.photo.attach(
    io: URI.open("https://connectin-fsp.s3.amazonaws.com/IMG_4252.jpeg"),
    filename:"IMG_4252.jpeg"
  )

  puts "Creates posts..."
  Post.create!(user_id: 1, description: "Proud to announce the successful completion of our latest project! The team's dedication and synergy were instrumental in achieving a seamless product launch at Google. Excited about the impact this will have, and looking forward to future challenges! #ProjectSuccess #TeamEffort")
  Post.create!(user_id: 2, description: "Had an inspiring time at the 'Global Business Summit.' Engaged with thought leaders and made valuable connections with professionals passionate about global economic trends. Grateful for the opportunity to expand my network and learn from diverse perspectives at Microsoft! #NetworkingOpportunity #ProfessionalConnections")
  Post.create!(user_id: 3, description: "Just wrapped up an intensive 'Leadership Development Program' on effective team management. The knowledge gained is already reshaping my approach to leadership. Lifelong learning is a journey, and I'm eager to apply these insights in my work at Amazon! #ContinuousGrowth #SkillsEnhancement")
  Post.create!(user_id: 4, description: "Had an amazing time at the Global Business Summit hosted by IBM. Great insights and valuable connections! #Networking #ProfessionalEvents")
  Post.create!(user_id: 5, description: "Thrilled to share my thoughts on AI trends in my recent article for Microsoft. Let's continue the conversation! #AI #ThoughtLeadership")
  Post.create!(user_id: 6, description: "Celebrating our team's achievement at Salesforce—topping the sales charts this quarter! Cheers to teamwork! #SalesSuccess #TeamCelebration")
  Post.create!(user_id: 2, description: "Successfully completed the Project Management certification at Oracle. Ready to lead projects with confidence! #ProjectManagement #Certification")
  Post.create!(user_id: 2, description: "Delighted to join the innovation hub at Apple. Looking forward to contributing to groundbreaking projects! #Innovation #Apple")
  Post.create!(user_id: 3, description: "Honored to receive the 'Outstanding Contribution Award' at Microsoft. Grateful for the recognition and motivated to do more! #Recognition #CareerAchievement")
  Post.create!(user_id: 3, description: "Joined Adobe as a Creative Designer. Ready to bring creativity to the next level! #NewBeginnings #AdobeDesign")
  Post.create!(user_id: 7, description: "Proud to represent Twitter at the Social Media Marketing Summit. Shared strategies for impactful online presence! #SocialMediaSummit #Twitter")
  Post.create!(user_id: 8, description: "Completed a digital marketing certification at Facebook Blueprint. Ready to implement strategic campaigns! #DigitalMarketing #FacebookCertification")
  Post.create!(user_id: 8, description: "Joined the innovation team at Amazon. Thrilled to contribute to cutting-edge projects shaping the future! #InnovationTeam #AmazonInnovation")
  Post.create!(user_id: 9, description: "Excited to take on a leadership role at LinkedIn. Looking forward to driving team success! #LeadershipRole #LinkedInCareer")
  Post.create!(user_id: 9, description: "Excited to join the AI research lab at IBM. Committed to advancing the field of artificial intelligence! #AIResearch #IBMResearchLab")
  

  
  
  
  

  puts "Done!"
