// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Voting {

    struct Election {
        uint id;
        string name;
        mapping(uint => string) candidates;
        mapping(address => bool) registeredVoters;
        mapping(address => bool) hasVoted;
        mapping(uint => uint) votesReceived;
    }

    Election[] public elections;

    function createElection(string memory _name, string[] memory _candidates) public {
        uint electionId = elections.length;
        elections.push(Election(electionId, _name));
        for (uint i = 0; i < _candidates.length; i++) {
            elections[electionId].candidates[i] = _candidates[i];
        }
    }

    function vote(uint _electionId, uint _candidateId) public {
        require(elections[_electionId].registeredVoters[msg.sender], "Voter is not registered for this election.");
        require(!elections[_electionId].hasVoted[msg.sender], "Voter has already cast their vote.");
        elections[_electionId].votesReceived[_candidateId]++;
        elections[_electionId].hasVoted[msg.sender] = true;
    }

    function checkEligibility(uint _electionId, address _voter) public view returns (bool) {
        return elections[_electionId].registeredVoters[_voter];
    }

    function hasVoted(uint _electionId, address _voter) public view returns (bool) {
        return elections[_electionId].hasVoted[_voter];
    }

    function fetchElectionResults(uint _electionId) public view returns (uint[] memory) {
        uint[] memory results = new uint[](elections[_electionId].candidates.length);
        for (uint i = 0; i < elections[_electionId].candidates.length; i++) {
            results[i] = elections[_electionId].votesReceived[i];
        }
        return results;
    }
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    Candidate[] public candidates;
    address owner;
    mapping(address => bool) public voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(string[] memory _candidateNames, uint256 _durationInMinutes) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidates.push(Candidate({
                name: _candidateNames[i],
                voteCount: 0
            }));
        }
        owner = msg.sender;
        votingStart = block.timestamp;
        votingEnd = block.timestamp + (_durationInMinutes * 1 minutes);

        // Initialize voters mapping
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            voters[msg.sender] = false;
        }
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only the contract owner can call this function.");
        _;
    }

    function addCandidate(string memory _name) public onlyOwner {
        candidates.push(Candidate({
            name: _name,
            voteCount: 0
        }));
    }

    function vote(uint256 _candidateIndex) public {
        require(!voters[msg.sender], "You have already voted.");
        require(_candidateIndex < candidates.length, "Invalid candidate index.");

        candidates[_candidateIndex].voteCount++;
        voters[msg.sender] = true;
    }

    function getAllVotesOfCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getVotingStatus() public view returns (bool) {
        return (block.timestamp >= votingStart && block.timestamp < votingEnd);
    }

    function getRemainingTime() public view returns (uint256) {
        require(block.timestamp >= votingStart, "Voting has not started yet.");
        if (block.timestamp >= votingEnd) {
            return 0;
        }
        return votingEnd - block.timestamp;
    }
}