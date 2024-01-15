# Load the Rails application.
require_relative "application"

# Initialize the Rails application.
Rails.application.initialize!

# Responses, on the other hand, are created on the backend but handled on the frontend
# Backend uses snake_case & frontEnd uses camelCase. This allows to transform keys typing convention
# You'll be using Jbuilder to construct your responses; You can instruct 
# Jbuilder to transform the keys in your responses before you send them out.
Jbuilder.key_format camelize: :lower 

# Even if the keys are nested, the typing convention from snake_case to camelCase
# should be transformed.
Jbuilder.deep_format_keys true 
