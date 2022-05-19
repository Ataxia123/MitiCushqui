// SPDX-License-Identifier: BUSL-1.1

pragma solidity 0.7.6;

import "../oz_modified/ICHIERC20.sol";

contract Token9 is ICHIERC20 {

    constructor() {
        initERC20("Token with 9 decimals", "Token9");
        _mint(0x84597270F7158BBCcC285C907A70eabfB53Eb721, 10000 * 10 ** 9);
        _setupDecimals(9);
    }

}
