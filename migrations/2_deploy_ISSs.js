// Fetch the GovernanceToken contract data from the GovernanceToken.json file
const GovernanceToken = artifacts.require("./GovernanceToken.sol");

var fs = require('fs');
const vestingEntries = JSON.parse(fs.readFileSync('../vestingSchedule.json', 'utf8'));
const airdropEntries = JSON.parse(fs.readFileSync('../airdrop.json', 'utf8'));
var legacyTokenNumber = BigInt(0);






// JavaScript export
module.exports = async function(deployer,network,accounts) {
    var layerZeroEndpoint;
    if (network === "polygon") {layerZeroEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62"}
    else if (network === "ethereum") {layerZeroEndpoint = "0x66A71Dcef29A0fFBDBE3c6a460a3B5BC225Cd675"}
    else if (network === "bsc") {layerZeroEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62"}
    else if (network === "avalanche") {layerZeroEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62"}
    else if (network === "arbitrum") {layerZeroEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62"}
    else if (network === "optimism") {layerZeroEndpoint = "0x3c2269811836af69497E5F486A85D7316753cf62"}
    else if (network === "fantom") {layerZeroEndpoint = "0xb6319cC6c8c27A8F5dAF0dD3DF91EA35C4720dd7"}
    else if (network === "mumbai") {layerZeroEndpoint = "0xf69186dfBa60DdB133E91E9A4B5673624293d8F8"}
    else if (network === "rinkeby") {layerZeroEndpoint = "0x79a63d6d8BBD5c6dfc774dA79bCcD948EAcb53FA"}
    else if (network === "bscTestnet") {layerZeroEndpoint = "0x6Fcb97553D41516Cb228ac03FdC8B9a0a9df04A1"}
    else if (network === "fuji") {layerZeroEndpoint = "0x93f54D755A063cE7bB9e6Ac47Eccc8e33411d706"}
    else if (network === "arbitrumRinkeby") {layerZeroEndpoint = "0x4D747149A57923Beb89f22E6B7B97f7D8c087A00"}
    else if (network === "kovan") {layerZeroEndpoint = "0x72aB53a133b27Fa428ca7Dc263080807AfEc91b5"}    
    else if (network === "fantomTestnet") {layerZeroEndpoint = "0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf"}

    else if (network === "development") {layerZeroEndpoint = "0x7dcAD72640F835B0FA36EFD3D6d3ec902C7E5acf"}
    console.log(network, layerZeroEndpoint)

    
    try {
        // Deploy the Goverance Token contract to the network
        await deployer.deploy(GovernanceToken,"ISSUAA Protocol Token","ISS",layerZeroEndpoint);
        governanceToken = await GovernanceToken.deployed()
        
       
    }
    catch (err) {
        console.log('Deploy step 1 failed', err);
        throw new Error('Deploy step 1 failed');
    }


    if (network === "mumbai" || network ==="maticTestnet" || network === "polygon" || network === "development") {
        await governanceToken.mint(accounts[0],BigInt(100000000) * BigInt(1e18))
        var legacyTokens = {};
        for (i=0; i<airdropEntries.length;i++) {
            let adr = vestingEntries[i][0]
            let amt = vestingEntries[i][1]
            await governanceToken.transfer(adr, BigInt(amt))
            console.log(adr,"-",amt)
        }

    }
}