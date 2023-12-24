//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/token/ERC20/ERC20.sol";

contract EthVoting {
    //附议人信息
    struct Voter {
        uint256 voteTimeStamp; //投票时的区块时间
        bool initialized; //判断是否投过票的标志
        uint256 money; //投票时所需费用
    }

    //提案内容
    struct Proposal {
        string pName; //提案标题
        string pCtx; //提案内容
        address chairperson; //提案主持人
        uint256 voteCount; //附议人数
        bool initialized; //判断提案是否存在的标志
        uint256 limitTime; //附议限制时间
        uint256 setmoney; //设置该提案所需费用
        uint256 setcount; //设置创建提案的数量
        mapping(address => Voter) Voters; //附议列表
    }

    //所有提案列表
    mapping(uint256 => Proposal) public proposals;
    //设置合约中的提案数量
    uint256 setCount;

    //创建附议事件
    event VoteEvt(
        string indexed eventType, //事件的类型
        address Voter, //获取的pid地址
        uint256 timestamp //时间戳
    );

    //提案事件
    event ProposeEvt(
        string indexed eventType, //事件类型
        uint256 proposalId, //pid
        uint256 limitTime //截止时间
    );

    //创建新提案
    function createProposal(
        string memory pName, //提案名称
        string memory pCtx, //提案内容
        uint256 limitTime, //截止时间
        uint256 setmoney //设置该提案所需费用
    ) public returns (uint256) {
        uint256 pId = block.timestamp; //pid设置为时间戳
        Proposal storage proposal = proposals[
            pId
        ]; //根据pid获取提案
        proposal.pName = pName; //获取提案名称
        proposal.pCtx = pCtx; //获取提案内容
        proposal.chairperson = msg.sender; //获取提案人
        proposal.initialized = true; //初始化
        proposal.limitTime = limitTime; //获取截取时间
        proposal.setmoney = setmoney; //获取初始化费用
        proposal.voteCount = 0; //初始化投票数据
        proposal.setcount = 0; //初始化提案数量

        //每次新创建提案后,让其提案数量自增1
        setCount += 1;
        //把提案数量传给全局变量
        proposal.setcount = setCount;
        //触发事件
        emit ProposeEvt("propose", pId, limitTime);
        //返回pid
        return pId;
    }

    //进行附议
    function doVoting(uint256 pId, uint256 setmoney)
        public
    {
        //提案是否存在
        if (proposals[pId].initialized == false)
            revert("该提案不存在");

        uint256 currentTime = block.timestamp;

        //是否已超过提案时限
        if (proposals[pId].limitTime < currentTime)
            revert("超过投票时间");

        //是否已经投过票
        if (
            proposals[pId]
                .Voters[msg.sender]
                .initialized == true
        ) revert("该用户已经投过票了！");

        //新投票信息
        Voter memory Voter = Voter({
            voteTimeStamp: block.timestamp,
            initialized: true,
            money: setmoney
        });

        //记录投票信息
        proposals[pId].Voters[
            msg.sender
        ] = Voter;
        proposals[pId].voteCount += 1;
        emit VoteEvt("vote", msg.sender, block.timestamp);
    }

    // 查询合约余额(可写可不写)
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    //使用ERC20代币转账
    function xuqingyaoTransactionTo1(
        address erc20Addr,
        address toAddr,
        uint256 money
    ) public {
        IERC20(erc20Addr).transfer(toAddr, money);
    }

    //使该部署的合约能够转账
    constructor() public payable {}

    //合约向外部账户转账
    function xuqingyaotransactionTo2(address payable account, uint256 ether)
        public
        payable
    {
        account.transfer(ether);
    }

    //查询是否附议
    function queryVoting(uint256 pId, address VoterAddr)
        public
        view
        returns (uint256)
    {
        //提案是否存在
        if (proposals[pId].initialized == false)
            revert("该提案不存在！");

        //返回投票时间
        return
            proposals[pId]
                .Voters[VoterAddr]
                .voteTimeStamp;
    }

    //获取区块链时间
    function getBlockTime() public view returns (uint256 time) {
        time = block.timestamp;
    }

    //查询提案标题
    function getProposalName(uint256 pId)
        public
        view
        returns (string memory title)
    {
        title = proposals[pId].pName;
    }

    //查询提案
    function getProposalCtx(uint256 pId)
        public
        view
        returns (string memory content)
    {
        content = proposals[pId].pCtx;
    }

    //查询附议人数
    function getProposalVCnt(uint256 pId)
        public
        view
        returns (uint256 voteCount)
    {
        voteCount = proposals[pId].voteCount;
    }

    //查询提案期限
    function getProposalLimit(uint256 pId)
        public
        view
        returns (uint256 limitTime)
    {
        limitTime = proposals[pId].limitTime;
    }


    fallback() external payable {}

    receive() external payable {}
}
