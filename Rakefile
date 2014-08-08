def run_command(description, command)
  puts "\n## #{description}"
  status = system(command)
  if not status
    abort("Failed to run this command")
  end
end

desc "Deploy _site/"
task :deploy do
  run_command("Building the site",
    "jekyll build")
  run_command("Staging modified files",
    "cd ./_site && git add --all")
  run_command("Committing a site build at #{Time.now.utc}",
    "cd ./_site && git commit -m \"build site at #{Time.now.utc}\"")
  run_command("Pushing commits to remote",
    "cd ./_site && git push origin gh-pages -f")
end

desc "Commit ./"
task :commit, [:message] do |t, args|
  run_command("Staging modified files",
    "cd . && git add --all")
  run_command("Committing with message",
    "cd . && git commit -m \"#{args['message']}\"")
  run_command("Pushing commits to remote",
    "cd . && git push")
end

desc "Commit and deploy"
task :cd, [:message] do |t, args|
  Rake::Task["commit"].invoke(args['message'])
  Rake::Task["deploy"].invoke
end

desc "Watch"
task :watch do
  `jekyll serve --watch`
end
