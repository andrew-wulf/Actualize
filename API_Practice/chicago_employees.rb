require "http"

data = HTTP.get("https://data.cityofchicago.org/resource/xzkq-xp2w.json").parse


professions = {}


for row in data
  job, salary = row['job_titles'], row['annual_salary']

  if salary == nil
    salary = row['hourly_rate'].to_f * 2000
  else
    salary = salary.to_f
  end

  if not professions[job]
    professions[job] = [salary]
  else
    professions[job].push(salary)
  end
end

top_professions = professions.select {|_k,v| v.length > 5}

most, prof = 0, nil
for key in top_professions.keys
  if top_professions[key].length > most
    most, prof = top_professions[key].length, key
  end
end

average_salaries = top_professions.map{|k, v| [k, (v.sum/v.length).to_i]}

i, largest, index = 0, 0, 0
while i < average_salaries.length
  curr = average_salaries[i][1]
  if curr > largest
    largest, index = curr, i
  end
  i+=1
end


puts "Most Workers: #{prof} | #{most} employees"
puts "Top Paying Profession: #{average_salaries[index][0]} | Average Salary: $#{largest}"




