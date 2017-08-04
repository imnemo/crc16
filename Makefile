all: clean build-node

build-node:
	node-gyp rebuild

build-xcode-project:
	node-gyp configure -- -f xcode

test-node:
	npm test

test-cpp:
	clang++ -Wc++11-extensions -std=c++11 -o ./test_cpp/crc16_test.out ./test_cpp/crc16_test.cc
	./test_cpp/crc16_test.out

test: test-cpp

.PHONY: clean
clean:
	rm -fr build
	rm -fr **/*.dSYM
	rm -f **/*.out
	rm -fr .nyc_output
	rm -fr coverage
