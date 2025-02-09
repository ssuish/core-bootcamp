// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract CoreConnectBootcampPH {

    struct Submission {
        address owner;
        string github;
        string firstname;
        address erc20;
        address erc721;
    }

    mapping(string => Submission) public submissions;

    function recordSubmission(
        string memory firstname,
        string memory github,
        address erc20,
        address erc721
    ) public {
        submissions[github] = Submission({
            owner: msg.sender,
            github: github,
            firstname: firstname,
            erc20: erc20,
            erc721: erc721
        });
    }

    function getSubmission(string memory github) public view returns (Submission memory) {
        return submissions[github];
    }
}