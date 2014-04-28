watch: node_modules
	node ./build.js --watch

build: node_modules
	rm -rf ./build/*
	node ./build.js
	
deploy: build
	cd ./build && git add --all
	cd ./build && git commit -m "deploy site $(shell date +%s)"
	cd ./build && git push origin gh-pages

node_modules: package.json
	npm install
	
node_modules/simple-server:
	npm install simple-server
	
server: node_modules/simple-server
	cd ./build && ../node_modules/.bin/simple-server

.PHONY: build