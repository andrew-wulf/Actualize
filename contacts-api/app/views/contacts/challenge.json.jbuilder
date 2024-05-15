json.array! @contacts do |c|
  json.first_name c.first_name
  json.last_name c.last_name
  json.email c.email
  json.phone_number c.phone_number
  json.id c.id

end