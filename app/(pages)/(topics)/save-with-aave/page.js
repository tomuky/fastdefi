'use client';
import NextNextButton from '@/app/components/NextButton';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount } from 'wagmi';
import { useReadContract } from 'wagmi';
import abi from '@/app/_abi/ERC20.json';
import BalanceDisplay from '@/app/components/BalanceDisplay';

export default function SaveWithAave() {

    const aBasUSDC_Address = '0x4e65fE4DbA92790696d040ac24Aa414708F5c0AB';
    const { address } = useAccount();

    const {data:balance, isLoading: isBalanceLoading, error: balanceError} = useReadContract({
        address: aBasUSDC_Address,
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
                    <div className={classes.note}>
                        <img src="/images/ui/star.png" alt="caution icon" className={classes.noteIcon}/>
                        Your balance shows up! No new account setup needed.
                    </div>
                    <li>Click Supply next to USDC</li>
                    <li>You might be prompted to switch your network to Base</li>
                    <li>Type in $10, click Approve USDC and confirm tx in your wallet popup</li>
                    <li>After tx confirms, click Supply USDC and confirm tx in your wallet popup</li>
                    <div className={classes.finish}>
                        <img src="/images/ui/finish.png" alt="finish icon" className={`${classes.noteIcon} ${classes.invert}`}/>
                        Done. You are earning interest every few seconds!
                    </div>
                </ol>
            </div>

            <BalanceDisplay style={{marginTop: 20}} title="Your USDC Balance" balance={balance} isBalanceLoading={isBalanceLoading}/>

            <NextNextButton title="Swap on Uniswap" target='/swap-on-uniswap'/>

            <div style={{minHeight: '100px', width: '100%', backgroundColor: 'inherit'}}/>
        </div>
    )
}