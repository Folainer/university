SRC_DIR := src
BIN_DIR := bin

CXX := g++
CXXFLAGS := -Wall -Wextra -std=c++17

SRC_FILES := $(shell dir /s /b $(SRC_DIR)\*.cpp)
OBJ_FILES := $(subst $(SRC_DIR),$(BIN_DIR),$(subst .cpp,.o,$(SRC_FILES)))
TARGET := $(BIN_DIR)/output.exe

build: 
	$(CXX) $(CXXFLAGS) -c ${SRC_FILES} -O ${BIN_DIR}
	$(CXX) $(CXXFLAGS) ./*.o -o $(BIN_DIR)/App.exe
	del "./*.o"

run: build
	./bin/App.exe

clean:
	rmdir /s /q $(BIN_DIR)

.PHONY: all clean