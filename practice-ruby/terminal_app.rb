
require 'uri'
require 'net/http'
require 'json'
require 'sqlite3'
require 'titlecase'
require 'faker'
require 'thread'

# Movie Battle! 
# The point of the game is to name successive movies that are linked by prominent cast or crew members.
# Each player can ban 3 people for their opponent at the start of the match.
# No movie can be used twice, and lniks can only be used up to three times.


#------- FINAL ADDITION ----------
# instead of links simply being unusable, forbid any matches between movies containing a link in the blacklist array.
# To accomplish this, set a results variable to nil and only set it's value to a match if it's previous value was nil.
# then, keep iterating through the data to check for blacklist matches. Any match = deny the connection and the guesser is out. 
# Players should also be able to disable this feature.

class Movie_Battle

  #Connect to local sqlite db for api keys
  def initialize
    mac_path = "/Users/awulf/API_Keys/api_keys.db"
    win_path = "C:\\Users\\chess\\VS Projects\\API_Keys\\api_keys.db"

    db = SQLite3::Database.new(mac_path)
    res = db.execute("select api_key1, api_key2 from API_Keys WHERE service = ?", 'themoviedb').first

    @access_token = res[1]

    @api_key = res[0]

    @base_url = 'https://api.themoviedb.org/3'
  end


  def input(secs: 40, remaining: false)
    remaining_secs = secs
    message = true
    timer = Thread.new do

      if remaining_secs > 25
        while remaining_secs > 25 && message
          sleep(1)
          remaining_secs -= 1
        end
        if message
          puts "#{remaining_secs} seconds remaining..."
        end
      end

      while remaining_secs > 15 && message
        sleep(1)
        remaining_secs -= 1
      end

      if message
        puts "#{remaining_secs} seconds remaining..."
      end

      while remaining_secs > 0 && message
        sleep(1)
        remaining_secs -= 1
      end
    end

    #I barely understand this part but it's giving consistent results and I'm going with it
    begin
      Timeout.timeout(secs) do
        input, _, _ = IO.select([$stdin], nil, nil, secs)
        
        if input
          # If input is available, read it and move on
          result = $stdin.gets.chomp
          begin
            result = result.titlecase # Consume the input
          rescue
            result = result
          end
          message = false
          if remaining
            output = [result, remaining_secs]
          else
            output = result
          end

          if result.downcase == 'exit'
            abort('Exiting program.')
          end
          return output
        else
          return nil
        end
      end
    rescue Timeout::Error
      return nil
    end
  end


  def display_links
    puts "Used links:\n\n"
    for link in @used_links.keys
      puts "#{link} " + ("X " * @used_links[link])
    end
  end

  #new game method refreshes all variables and starts a new match.
  def new_game(bans: true, random: true, test_run: false, multi: true, hard_mode: false)
    @hard_mode = hard_mode

    @players, @used_links = {}, {}
    names = []
    #pp [bans, random, test_run]

    puts "\nWelcome to Movie battle!\n\nThe point of the game is to name successive movies that are linked by prominent cast or crew members.\n\nEach player can ban 3 people (AKA links) for their opponent at the start of the match.\nRepeat movie titles cannot be used, and links can only be used up to three times. \nPlayers have 40 seconds each to make a valid guess, or they're out! \n\nEveryone has three lifelines (one-use only): \nskip = skips your turn. \ninfo = displays cast & crew of current movie. \ntime = adds 30 seconds to the timer."
    
    puts "\nCurrent game settings: Bans: #{bans} | Random starting movie: #{random} | hard mode: #{hard_mode}"
    

    if multi && test_run === false
      puts "\n\nHow many players? (can have 2-8)"
      players = input(secs: 300).to_i
      while players < 2 || players > 8
        players = input(secs: 300).to_i
      end
    end


    if test_run
      players = 2
      names = ["player 1", "player 2"]
    else
      i = 0
      while i < players
        puts "\nEnter the name for Player #{i + 1}:"
        name = input(secs: 300) || "Player #{i}"
        if name == ""
          name = "Player #{i}"
        end
        names.push(name)
        i +=1
      end
    end
    #For debugging
    if names.include?(nil)
      pp names
    end
    i = rand(0...names.length)
  
    names.length.times do
      @players[names[i]] = {active: true, bans: [], lifelines: {skip: true, info: true, time: true}}
      i += 1
      if i >= names.length
        i = 0
      end
    end

    first, second = @players.keys.first, @players.keys.last
    puts "\n#{first} will go first."

    if @players.length == 2
      for pl in [first, second]
        puts "#{pl}, pick three actors to ban for the other player."

        if test_run
          actor = search('Tom Cruise', type:'person')
          actor2 = search('Tom Holland', type:'person')
          actor3 = search('Tom Hanks', type:'person')

          for a in [actor, actor2, actor3]
            if a
              @players[pl][:bans].push(a['name'])
            end
          end

        elsif bans
          3.times do
            actor = search(input, type: 'person')
            if actor
              @players[pl][:bans].push(actor['name'])
            end
          end
        end
      end
      for pl in [first, second]
        puts "\n\n#{pl}'s bans: "
        puts @players[pl][:bans]
      end
    end

    prev = nil
    running = true
    timeout = false
    auto = false
    
    if random || test_run
      auto = true
      puts "Picking random movies..."
      random_movies, return_index = [], -1
      5.times do
        random_movies.push(Faker::Movie.title)
      end
      puts "Pick your starting movie! (enter index)"
      puts random_movies.map.with_index(1) {|m, i| "#{i} #{m}"}

      while return_index < 0 || return_index > 4
        return_index = gets.chomp.to_i - 1
      end
      movie_to_match = random_movies[return_index]
    else
      puts "\nEnter first movie:"
      movie_to_match = input(secs: 300)
    end

    current_data = movie_data(movie_to_match, auto: auto)
    movies = [movie_to_match]
    puts "Selected #{movie_to_match}."

    if not test_run
      puts "\n\nPress Enter to start the game!"
      gets
    end

    puts "\nGame Start!" 
    puts "(to help you get started, notable cast & crew from the first movie will be listed.)"

    def movie_info(data)
      for title in [:director, :screenplay, :composer, :cinematographer, :editor]
        if data[title][0] && data[title][0] != ""
          puts "#{title.to_s.titlecase}: #{data[title][0]}"
        end
      end

      actors = data[:cast][...5].map {|arr| arr[0]}.join(', ')
      puts "Notable actors: #{actors}\n"
    end

    i = 0
    while running
      active_players = []
      @players.each do |k, v| 
        if v[:active]
          active_players.push(k)
        end
      end
      if active_players.length == 1
        winner = active_players[0]
        break
      end

      if i >= @players.length
        i = 0
      end

      current_player = @players.keys[i]
      if @players[current_player][:active]
        if not running
          break
        end

        info = current_data[:info]
        pretty_title = "----- #{info[0]} (#{info[1]}) -----"
        puts "\n#{pretty_title}"

        if movies.length == 1
          movie_info(current_data)
        end

        if current_player == first
          opp = second
        else
          opp = first
        end
        
        puts "\n#{current_player}'s turn:"
        if prev
          puts"Name a movie to link with \'#{movie_to_match}\'."
        end
        
        skipped, timeout = false, false
        secs = 40

        while true
          guess, secs = *input(secs: secs, remaining: true)
          if not guess
            timeout = true
            break
          end

          lifelines = ['skip', 'info', 'time']
          if lifelines.include?(guess.downcase)
            lifeline = lifelines[lifelines.index(guess.downcase)]
            status = @players[current_player][:lifelines][lifeline.to_sym]
 
            if not status
              puts "'#{lifeline}' lifeline already used!"
            else
              puts "\nUsed #{lifeline} lifeline!"
              puts ""
              @players[current_player][:lifelines][lifeline.to_sym] = false

              if lifeline == 'info'
                movie_info(current_data)
              elsif lifeline == 'time'
                secs += 20
                puts "30 seconds added to the timer."
              elsif lifeline == 'skip'
                skipped = true
                break
              end
            end
          else
            info = self.search(guess, type: 'movie', auto_select: true)

            if not info
              puts "Invalid guess, try again."
            elsif movies.include?(info['original_title'])
              puts "'#{info['original_title']}' has already been used, try again."
            else
              break
            end
          end
        end

        if skipped
          i +=1
          next
        elsif timeout
          puts "\nTime's up!"
          @players[current_player][:active] = false
          puts "#{current_player} is out."
          next
        end

        challenger = movie_data(guess)
        
        blacklist = @players[opp][:bans]
        @used_links.keys.each do |link|
          if @used_links[link] >= 3
            blacklist.push(link)
          end
        end

        res = compare_movies(current_data, challenger, blacklist=blacklist)
        
        if res
          if res[1] == 'blacklisted'
            puts "LINK ALREADY USED 3 TIMES-- #{res[0]} (#{res[2]})"
            puts "#{current_player} is out."
            @players[current_player][:active] = false
          else
            new_link(res[0])
            puts "\nLink! --- #{res[0]} (#{res[2]}) | used: " + ("X " * @used_links[res[0]])
            movie_to_match, current_data = challenger[:info][0], challenger
            movies.push(movie_to_match)
          end
        else
          puts "No links found for #{challenger[:info][0]} (#{challenger[:info][1]})."
          #pp challenger
          #pp current_data
          @players[current_player][:active] = false
          puts "#{current_player} is out."
        end
      end
      i +=1
    end

    puts "\n*****   |   #{winner} wins!   |   *****"
    puts "\nMovie streak: #{movies.length}\n-------------------------------------------------"
  end

  def new_link(person)
    if @used_links.include?(person)
      @used_links[person] += 1
    else
      @used_links[person] = 1
    end
  end

  def in_blacklist?(person, blacklist)
    blacklist.each do |n| 
      if n == person
        #pp [n, person]
        return true
      end
    end
    return false
  end

  #the search method validates that the input has a valid entry in moviedb, and returns the id of the match.
  def search(term, type: 'movie', auto_select: false)
    if not term
      return nil
    end

    search_params = { 'api_key' => @api_key, 'query' => term }

    if type == 'person'
      search_url = URI("#{@base_url}/search/person")
    elsif type == 'movie'
      search_url = URI("#{@base_url}/search/movie")
    else
      return nil
    end

    search_url.query = URI.encode_www_form(search_params)
    #pp search_url
    response = Net::HTTP.get_response(search_url)

    data = JSON.parse(response.body)
    if data['results'].any?
      if type == 'person'
        return data['results'][0]
      end

      output, i, return_index = [], 0, -1
      while i < 6 && i < data['results'].length
        curr_movie = data['results'][i]
        curr_movie['year'] = curr_movie['release_date'][...4]

        if output.length == 0 || curr_movie['original_title'] == output[0]['original_title']
          output.push(curr_movie)
        else
          break
        end
        i +=1
      end

      if auto_select
        return output[0]
      end

      if output.length > 1
        puts "Which version of #{output[0]['original_title']} are you searching for? (Enter index)"
        puts output.map.with_index(1) {|m, i| "#{i} #{m['original_title']} (#{m['year']})"}

        while return_index < 0 || return_index > output.length - 1
          return_index = gets.chomp.to_i - 1
        end
      end
      return output[return_index]
    end
    return nil
  end
  

  def movie_data(term, auto: false)

    info = self.search(term, type: 'movie', auto_select: auto)
    id = info['id']
    #pp info

    search_params = { 'api_key' => @api_key, 'query' => term }
    search_url = URI("#{@base_url}/movie/#{id}/credits?language=en-US")

    search_url.query = URI.encode_www_form(search_params)
    response = Net::HTTP.get_response(search_url)
    data = JSON.parse(response.body)

    if data
      output = {info: [info['title'], info['year']], director: [], screenplay: [], cinematographer: [], composer: [], editor: [], cast: []}

      for row in data['crew']
        job = row['job']
        #pp job
        for title in output.keys
          t = title.to_s
          if t == 'cinematographer'
            t = "director of photography"
          elsif t == 'composer'
            t = "original music composer"
          end

          if job.downcase == t
            output[title].push(row['name'])
          end
        end
      end

      cast = data['cast']

      i = 0
      while i < 50 && i < cast.length
        output[:cast].push([cast[i]['name'], cast[i]['character']])
        i +=1
      end
      return output
    else
      return nil
    end
  end


  #compare method will try to match a cast or crew member of two given movies without using any blacklisted names

  def compare_movies(movie1_data, movie2_data, blacklist=nil)
    if not blacklist
      blacklist = []
    end
    #pp blacklist

    first_match = nil
    info = movie2_data[:info]


    i = 1
    while i < movie1_data.keys.length
      key = movie1_data.keys[i]

      for person in movie1_data[key]
        if key == :cast
          person, role = person[0], person[1]
        end

        for title in [:director, :screenplay, :cinematographer, :composer, :editor]
          for crew in movie2_data[title]
            if crew == person
              if @hard_mode
                if self.in_blacklist?(crew, blacklist)
                  return [crew, 'blacklisted', title.to_s]
                elsif not first_match
                  first_match = [crew, key, title.to_s]
                end
              else
                return [crew, key, title.to_s]
              end
            end
          end
        end

        for actor in movie2_data[:cast]
          if actor[0] == person 
            if @hard_mode
              if self.in_blacklist?(actor[0], blacklist)
                return [actor[0], 'blacklisted', actor[1]]
              elsif not first_match
                first_match = [actor[0], role, actor[1]]
              end
            else
              return [actor[0], role, actor[1]]
            end            
          end
        end
      end
    
      i +=1
    end
    return first_match
  end

end





def demo
  engine = Movie_Battle.new
  engine.new_game(bans: false, random: true, test_run: false, multi: true, hard_mode: false)
end










#OLD CODE -- this is a simpler game which finds a movie in themoviedb by naming actors in it until there is one option left.

class Movie_DB
  def initialize

    db_path = "/Users/awulf/API_Keys/api_keys.db"
    db = SQLite3::Database.new(db_path)
    res = db.execute("select api_key1, api_key2 from API_Keys WHERE service = ?", 'themoviedb').first

    @access_token = res[1]

    @api_key = res[0]

    @base_url = 'https://api.themoviedb.org/3'
  end


  def search(term, type='person')
    
    if type == 'person'
      search_url = URI("#{@base_url}/search/person")
    elsif type == 'movie'
      search_url = URI("#{@base_url}/search/movie")
    else
      return nil
    end

    search_params = { 'api_key' => @api_key, 'query' => term }
    search_url.query = URI.encode_www_form(search_params)

    response = Net::HTTP.get_response(search_url)

    data = JSON.parse(response.body)
    if data['results'].any?
      return data['results'][0]['id']
    end
    return nil
  end



  def find_movie

    puts "To find a movie, keep naming actors to narrow the results."

    movies = []

    while movies.length == 0 || movies.length > 1


      puts "Name an actor:"
      actor = input
      if actor == "exit"
        return
      elsif actor == "movies"
        puts "Possible movie list:"
        puts movies
      end

      actor_id = search(actor)

      # Check if id was found
      if actor_id

        # Get movie credits for actor
        credits_url = URI("#{@base_url}/person/#{actor_id}/movie_credits")
        credits_params = { 'api_key' => @api_key }
        credits_url.query = URI.encode_www_form(credits_params)

        credits_response = Net::HTTP.get_response(credits_url)
        credits_data = JSON.parse(credits_response.body)

        # Print titles of movies featuring actor

        if movies.length == 0
          credits_data['cast'].each do |movie|
            movies.push(movie['title'])
          end

        elsif movies.length > 1
          new_movies = []
          credits_data['cast'].each do |movie|
            if movies.include?(movie['title'])
              new_movies.push(movie['title'])
            end
          end
          
          if new_movies.length > 0
            movies = new_movies
          end
        end
        puts "There are #{movies.length} possible movies you could be looking for."
      else
        puts "#{actor} not found."
      end
    end
  end
end


#db = Movie_DB.new
#db.find_movie

# db = Movie_Battle.new
# pp db.search("Cinderella")
demo