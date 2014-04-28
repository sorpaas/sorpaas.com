watch: node_modules node_modules/simple-server
	node ./build.js --watch & cd ./build && ../node_modules/.bin/simple-server

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

.PHONY: build