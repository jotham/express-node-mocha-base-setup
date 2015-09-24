ifeq (,$(shell which node))
   $(error "Requires node in $PATH")
endif
ifeq (,$(shell which npm))
   $(error "Requires npm in $PATH")
endif
ifeq (,$(shell which entr))
   $(error "Requires entr in $PATH")
endif

run:
	 node src/index.js
.PHONY: run

install:
	 sudo npm -g install mocha
	 npm install
.PHONY: install

test:
	 mocha --recursive test/
.PHONY: test

watch:
	@find . -not -path '*node_modules*' \( -name '*.js' -o -name '*.json' \) \
        | entr -r node src/index.js

watch-test:
	@sleep 1 # Let node reload
	@find . -not -path '*node_modules*' \( -name '*.js' -o -name '*.json' \) \
        | entr -r mocha --recursive test/

