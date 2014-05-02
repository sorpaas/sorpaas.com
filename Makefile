watch: node_modules node_modules/http-server
	./node_modules/.bin/http-server ./build & node ./build.js --watch
	wait

build: node_modules
	node ./build.js
	
deploy: build
	cd ./build && git add --all
	cd ./build && git commit -m "deploy site $(shell date +%s)"
	cd ./build && git push origin gh-pages
	
clean:
	./clean.sh

node_modules: package.json
	npm install
	
node_modules/http-server:
	npm install http-server

.PHONY: build watch deploy clean