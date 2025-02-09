// SPDX-License-Identifier: UNLICENSE

pragma solidity >=0.8.0 <0.9.0;

contract Counter {
    int256 private counter = 0;

    function getCounter() public view returns (int256) {
        return counter;
    }

    function increment() public {
        counter++;
    }

    function decrement() public {
        counter--;
    }
}
