'use client';
import NextNextButton from '@/app/components/NextButton';
import Balances from '@/app/(pages)/(topics)/swap-on-llamaswap/Balances';
import classes from '@/app/(pages)/Pages.module.css';
import { useAccount, useBalance, useChainId } from 'wagmi';
import ListFinish from '@/app/components/ListFinish';
import ListNote from '@/app/components/ListNote';
import { formatUnits } from 'viem';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import Intro from '@/app/components/Intro';
import Tabs from '@/app/components/Tabs';
import { useTabs } from '@/app/_hooks/useTabs';
import FAQ from '@/app/components/FAQ';
import FAQItem from '@/app/components/FAQItem';

export default function SwapOnLlamaSwap() {
    const { address, isConnected } = useAccount();
    const TABS = ['swap','faq'];
    const { activeTab, setActiveTab } = useTabs(TABS);
    const chainId = useChainId();
    const isBase = chainId === 8453; // Base network chain ID
    
    // Get ETH balance
    const { data: ethBalance, isLoading: isLoadingEth } = useBalance({address});

    // Get cbBTC balance
    const { data: cbBtcBalance, isLoading: isLoadingCbBtc } = useBalance({
        address: address,
        token: '0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf',
    });

    // Helper function to safely check if balance is greater than zero
    const hasBalance = (balance) => balance && parseFloat(formatUnits(balance.value, balance.decimals)) > 0;

    console.log('ethBalance', ethBalance);
    // console.log('cbBtcBalance', cbBtcBalance);
    // console.log('isBase', isBase);

    return (
        <div className={classes.container}>
            
            <PageTitle title="Swap on LlamaSwap" image="/images/logos/llamaswap.png"/>
            
            <Intro>
                <p>Trade tokens directly from your wallet</p>
            </Intro>

            <Tabs
                tabs={['swap','faq']}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            
            {activeTab === 'swap' && (
                <div style={{marginBottom:'20px'}}>
                    <div className={classes.steps}>
                        <ol>
                            { !isConnected && (
                                <>
                                    <li>Get some ETH in your wallet</li> 
                                    <li>Make sure you are connected to the Base network</li>
                                </>
                            )}
                            { isConnected && !isBase && (
                                <li>Connect to Base network by clicking the network button on this page</li>
                            )}
                            { isConnected && isBase && (isLoadingEth || isLoadingCbBtc) && (
                                <li>Loading balances...</li>
                            )}
                            { isConnected && isBase && !isLoadingEth && !isLoadingCbBtc && (
                                <>
                                    {!hasBalance(ethBalance) && (
                                        <li>Get some ETH in your wallet</li>
                                    )}
                                </>
                            )}
                            <li>Go to <a href="https://swap.defillama.com/?chain=base&from=0x0000000000000000000000000000000000000000&tab=swap&to=0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf" target="_blank">swap.defillama.com</a> and connect your wallet</li>
                            <li>Select ETH as token to swap from</li>
                            <li>Select cbBTC as token to swap to</li>
                            <ListNote>cbBTC is tokenized BTC on Base, price is pegged to BTC</ListNote>
                            <li>Type in a sample amount to swap like 0.002 ETH</li>
                            <li>Double check you&apos;re swapping right assets and on Base network</li>
                            <li>Select the best aggregator recommended by DeFi Llama</li>
                            <li>Click Swap, confirm the tx in your wallet popup</li>
                            { hasBalance(cbBtcBalance) && <ListFinish>Done. You swapped tokens directly from your wallet!</ListFinish> }
                            { !hasBalance(cbBtcBalance) && <li>After you swap you will see your balances update below</li> }
                        </ol>
                    </div>

                    <Balances ethBalance={ethBalance} cbBtcBalance={cbBtcBalance} isConnected={isConnected} />
                </div>

            )}

            {activeTab === 'faq' && (
                <FAQ>
                    <FAQItem question="What is LlamaSwap?" answer="LlamaSwap is a decentralized exchange aggregator that finds you the best price from many different decentralized exchanges"/>
                    <FAQItem question="What is a decentralized exchange?" answer="A decentralized exchange (or DEX) is a platform that allows you to trade tokens directly from your wallet without a centralized intermediary"/>
                    <FAQItem question="What are the risks?" answer="There are minimal risks, but be careful trying to swap unknown tokens because they could do unexpected malicious things"/>
                </FAQ>
            )}

            

            <NextNextButton title="Earn on Uniswap" target='/earn-on-uniswap'/>

            <Spacer/>
        </div>
    )
}