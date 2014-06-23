desc "Deploy _site/"
task :deploy do
  puts "\n## Staging modified files"
  status = system("cd ./_site && git add -all")
  puts status ? "Success" : "Failed"
  puts "\n## Committing a site build at #{Time.now.utc}"
  message = "Build site at #{Time.now.utc}"
  status = system("cd ./_site && git commit -m \"#{message}\"")
  puts status ? "Success" : "Failed"
  puts "\n## Pushing commits to remote"
  status = system("cd ./_site && git push origin gh-pages")
  puts status ? "Success" : "Failed"
end
