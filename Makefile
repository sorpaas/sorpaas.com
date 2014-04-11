build: node_modules
	node ./build.js
	
deploy: build
	cd ./build && git add --all
	cd ./build && git commit -m "deploy site $(shell date +%s)"
	cd ./build && git push origin gh-pages

node_modules: package.json
	npm install

.PHONY: build