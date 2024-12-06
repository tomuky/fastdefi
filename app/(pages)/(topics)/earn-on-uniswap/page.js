'use client';
import classes from '@/app/(pages)/Pages.module.css';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';
import Intro from '@/app/components/Intro';
import NextNextButton from '@/app/components/NextButton';
import LPBalance from './LPBalance';

export default function EarnOnUniswap() {
    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/uniswap-logo.png" alt="uniswap logo" className={classes.titleImage} />
                Earn on Uniswap
            </div>
            <Intro>
                <p>Provide liquidity for token pairs</p>
                <p>Earn fees from others using the pool to swap</p>
            </Intro>
            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href='https://app.uniswap.org/pools/v2' target='_blank'>app.uniswap.org/pools/v2</a> to create a v2 position</li>
                    <ListNote>v2 is simpler, maintains a 50/50 ratio of the 2 tokens</ListNote>
                    <li>Click Add V2 liquidity and select ETH and USDC as the 2 tokens</li>
                    <li>Make sure you're on Base network</li>
                    <li>Type in $10 of USDC and it will prefill the ETH side</li>
                    <li>Click Approve USDC and confirm the tx in your wallet popup</li>
                    <li>Click Supply, then click Confirm Supply, and confirm the tx in your wallet popup</li>
                    <ListFinish>Done. You're collecting fees that auto-compound into your position!</ListFinish>
                </ol>
            </div> 

            <LPBalance tokenAddress='0x88a43bbdf9d098eec7bceda4e2494615dfd9bb9c' />

            <NextNextButton title="Get a username" target='/get-a-username'/>

            <div style={{minHeight: '100px', width: '100%', backgroundColor: 'inherit'}}/>
        </div>
    )
}