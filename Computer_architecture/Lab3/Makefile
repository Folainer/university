SRC_DIR := src
TEST_DIR := tests
BIN_DIR := bin

CXX := g++
CXXFLAGS := -Wall -Wextra -std=c++17

# Use wildcard instead of `dir` for compatibility
SRC_FILES := $(wildcard $(SRC_DIR)/*.cpp)
TEST_FILES := $(wildcard $(TEST_DIR)/*.cpp)
SRC_FOR_TEST_FILES := $(filter-out src/App.cpp, $(SRC_FILES))

APP_TARGET := $(BIN_DIR)/App.exe
TEST_TARGET := $(BIN_DIR)/TestApp.exe


all: run

# Compile and build main application
build:
	@echo Compiling app...
	@if not exist $(BIN_DIR) mkdir $(BIN_DIR)
	$(CXX) $(CXXFLAGS) $(SRC_FILES) -o $(APP_TARGET)

# Compile and build test application (includes src + tests)
test:
	@echo Compiling tests...
	@if not exist $(BIN_DIR) mkdir $(BIN_DIR)
	$(CXX) $(CXXFLAGS) $(SRC_FOR_TEST_FILES) $(TEST_FILES) -o $(TEST_TARGET)

# Run app
run: build
	$(APP_TARGET)

# Run tests
runtest: test
	$(TEST_TARGET)

# Clean binary folder
clean:
	@if exist $(BIN_DIR) rmdir /s /q $(BIN_DIR)

.PHONY: all build test run runtest clean
