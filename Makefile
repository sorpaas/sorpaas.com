build: node_modules
	node ./build.js
	
deploy: build
	cd ./build
	git add --all
	git commit -m "deploy site $(shell date +%s)"
	git push origin gh-pages

node_modules: package.json
	npm install

.PHONY: build