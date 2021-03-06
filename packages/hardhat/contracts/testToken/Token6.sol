// SPDX-License-Identifier: BUSL-1.1

pragma solidity 0.7.6;

import "../oz_modified/ICHIERC20.sol";

contract Token6 is ICHIERC20 {

    constructor() {
        initERC20("Token with 6 decimals", "Token6");
        _mint(0x84597270F7158BBCcC285C907A70eabfB53Eb721, 10000 * 10 ** 18);
        _setupDecimals(18);
    }

}
