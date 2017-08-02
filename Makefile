all: clean build-test build-node-module

build-node:
	node-gyp rebuild

build-xcode-project:
	node-gyp configure -- -f xcode

test-node:
	npm test

test-cpp:
	clang++ -Wc++11-extensions -std=c++11 -o ./test/crc16_test.out ./test/crc16_test.cc
	./test/crc16_test.out

.PHONY: clean
clean:
	rm -fr build
	rm -fr **/*.dSYM
	rm -f **/*.out
