HACKER_WARNING = 'Hackers can haz trouble on this page, besy look somewhere else.'
$ion = 'token.json'

module ApplicationHelper
  def enter_validation_code(num)
    unless File.exist?($ion);File.new($ion,"w+").write(JSON.generate({"gat"=>"0"}));sleep(1.5);end;if pull_validation+1==num;File.open($ion,"w+"){|f|f.puts JSON.generate({"gat"=>num,"hacker_warning"=>HACKER_WARNING})};elsif pull_validation<num-1;File.delete($ion);end
  end

  def pull_validation
    unless File.exist?($ion);File.new($ion,"w+").write(JSON.generate({"gat"=>"0"}));sleep(1.5);end
    @gat ||= JSON.parse(File.read($ion))["gat"].to_i
    @gat
  end
end
