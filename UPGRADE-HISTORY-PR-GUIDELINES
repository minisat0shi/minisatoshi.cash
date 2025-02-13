## If you would like to submit a PR for the Upgrade History page, please follow the following formats!

### When adding any new upgrades, first copy the third to last <li> item that is found in the <ul> tag with id="lockedIn" into the above <ul> section above the "</ul> <!--Make sure second to last upgrade implemented goes above the <ul>-->". Next, copy the <li> item that is found in the <ul> tag with id="future" into the above <ul> section with id="lockedIn". Then add the new expected/future upgrade(s) as an <li> following the existing formats in the <ul> section with the id="future"

### Most recently implemented upgrade and expected/locked-in upgrade
#### The most recently implemented upgrade needs to have its <ul> with an id="lockedIn" -- this is a bit counterintuitive but is meant to represent the forward line leading to the next upgrade, which is the one "lockedIn"
#### The locked-in upgrade, or the upgrade that is expected to be locked in, should have its <ul> with an id="future" -- again, this id represents the future, and has a faded dotted line continuing
#### The final <li> item at the bottom is the arrow shape pointing downwards (aka the future)

```
<ul id="lockedIn" class="timeline"> <!--Most recently implemented upgrade goes here-->
    <li id="hardFork" class="timeline-item mb-5">
        <img class="upgrade-icon-large" alt="ABLA graphic" src="images/UpgradeGraphics/BCHUpgrades_Icons/25.svg?v=0.04" />
        <h3 id="upgrade25-ABLA" class="fw-bold text-break share-item">ABLA<span class="ms-2 share-button" data-bs-toggle="tooltip" data-bs-placement="top" title="Share"><i class="bi bi-share"></i></span></h3>
        <p class="fs-4 mb-1">2024-05-15</p>

        <p class="fs-4 mb-1 text-break">Adaptive Blocksize Limit Algorithm</p>
        <p class="fs-5r text-secondary text-break">
            Needing to coordinate manual increases to BitcoinCash's blocksize limit incurs a meta cost on all network participants. The need to regularly come to agreement makes the network vulnerable to social attacks, as had occured on Bitcoin Core from its early history.<br><br>
            To reduce Bitcoin Cash's social attack surface and save on meta costs for all network participants, ABLA automatically adjusts the blocksize limit after each block, based on the exponentially weighted moving average size of previous blocks.<br><br>
            The algorithm preserves the existing 32 MB limit as the floor "stand-by" value, and any increase by the algorithm can be thought of as a bonus on top of that, sustained by actual transaction load.
        </p>
    </li>
</ul>
<ul id="future" class="timeline"> <!--The next expected/locked-in upgrade goes here-->
    <li id="hardFork" class="timeline-item mb-5">
        <img class="upgrade-icon-large" alt="VM Limits + BigInts graphic" src="images/UpgradeGraphics/BCHUpgrades_Icons/VMLimits+BigInt.svg?v=0.04" />
        <h3 id="upgrade26-VMLA" class="fw-bold text-break share-item">VMLA<span class="fs-5r"><small> (Velma)</small></span><span class="ms-2 share-button" data-bs-toggle="tooltip" data-bs-placement="top" title="Share"><i class="bi bi-share"></i></span></h3>
        <p class="timelineTitle mb-1">[Locked-In]</p> <!--Only add this line if the upgrade was locked in on November 15th-->
        <p class="fs-4 mb-1">2025-05-15</p>

        <p class="fs-4 mb-1 text-break">Targeted Virtual Machine Limits + BigInts</p>
        <p class="fs-5r text-secondary text-break">
            Bitcoin Cash's virtual machine (VM) limits have been re-targeted to enable more advanced contracts, reduce transaction sizes, and reduce full node compute requirements.<br><br>
            <strong>More advanced contracts:</strong><br>
            The 201 opcode limit and 520-byte, Pay-to-Script-Hash (P2SH) contract length limit each raise the cost of developing Bitcoin Cash products by requiring contract authors to remove important features or otherwise complicate products with harder-to-audit, multi-input systems. Replacing these limits reduces the cost of contract development and security audits.<br><br>
            <strong>Larger stack items:</strong><br>
            Re-targeted limits enable new post-quantum cryptographic applications, stronger escrow and settlement strategies, larger hash preimages, more practical zero-knowledge proofs, homomorphic encryption, and other important developments for the future security and competitiveness of Bitcoin Cash.<br><br>
            <strong>Simpler, easier-to-audit, high-precision math:</strong><br>
            Lowers the cost of developing, maintaining, and auditing contract systems relying on high-precision math: automated market makers, decentralized exchanges, decentralized stablecoins, collateralized loan protocols, cross-chain and sidechain bridges, and other decentralized financial applications. By allowing Bitcoin Cash to offer contracts maximum-efficiency, native math operations, this proposal would significantly reduce transaction sizes, block space usage, and node CPU utilization vs. existing emulated-math solutions.
        </p>
    </li>
    <li id="final" class="timeline-item mb-5">
    </li>
</ul>
```
