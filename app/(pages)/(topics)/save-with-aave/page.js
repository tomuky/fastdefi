'use client';
import NextNextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import abi from '@/app/_abi/ERC20.json';
import AaveBalanceDisplay from '@/app/components/AaveBalanceDisplay';
import ListNote from '@/app/components/ListNote';
import ListFinish from '@/app/components/ListFinish';

export default function SaveWithAave() {

    const aBaseUSDC_Address = '0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB';
    const { address } = useAccount();

    const {data:balance, isLoading: isBalanceLoading, error: balanceError} = useReadContract({
        address: aBaseUSDC_Address,
        abi: abi,
        functionName: 'balanceOf',
        args: [address],
        watch: true,
        query: {
            enabled: Boolean(address),
            refetchInterval: 10000,
        }
    });

    return (
        <div className={classes.container}>
            <div className={classes.title}>
                <img src="/images/logos/aave-logo.png" alt="aave logo" className={classes.titleImage} />
                Save with Aave
            </div>
            <div className={classes.intro}>
                <p>You can earn interest with Aave's lending protocol</p>
            </div>
            <div className={classes.steps}>
                <ol>
                    <li>Go to <a href='https://app.aave.com/?marketName=proto_base_v3' target='_blank'>app.aave.com</a> and click connect wallet</li>
                    <ListNote>Your balance shows up! No new account setup needed.</ListNote>
                    <li>Click Supply next to USDC</li>
                    <li>You might be prompted to switch your network to Base</li>
                    <li>Type in $10, click Approve USDC and confirm tx in your wallet popup</li>
                    <li>After tx confirms, click Supply USDC and confirm tx in your wallet popup</li>
                    <ListFinish>Done. You are earning interest every few seconds!</ListFinish>
                </ol>
            </div>

            <AaveBalanceDisplay style={{marginTop: 20}} title="Your USDC Balance" balance={balance} isBalanceLoading={isBalanceLoading}/>

            <NextNextButton title="Swap on Uniswap" target='/swap-on-uniswap'/>

            <div style={{minHeight: '100px', width: '100%', backgroundColor: 'inherit'}}/>
        </div>
    )
}