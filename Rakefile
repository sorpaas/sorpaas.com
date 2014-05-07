task :build do |t|
  `middleman build`
end

task :deploy => [:build] do |t|
  `cd ./build && git add --all && git commit -m "deploy site" && git push origin gh-pages`
end

task :server do |t|
  `middleman`
end

task :default => [:server]
