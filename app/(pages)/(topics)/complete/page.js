'use client';
import classes from '@/app/(pages)/Pages.module.css';
import styles from './Complete.module.css';
import Spacer from '@/app/components/Spacer';
import PageTitle from '@/app/components/PageTitle';
import Intro from '@/app/components/Intro';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

export default function Complete() {

    const router = useRouter();

    const achievements = [
        { emoji: '👛', text: 'Created your first crypto wallet' },
        { emoji: '💰', text: 'Bought crypto with your bank account' },
        { emoji: '📈', text: 'Earned yield on Aave' },
        { emoji: '🦄', text: 'Provided liquidity on Uniswap' },
        { emoji: '🔄', text: 'Swapped tokens like a pro' },
        { emoji: '📊', text: 'Tracked your portfolio with Zapper' },
    ];

    return (
        <div className={classes.container}>
            
            <Intro>
                <p className={styles.celebrationText}>🎉 Congratulations! 🎉</p>
                <p>You&apos;ve completed Fast DeFi!</p>
            </Intro>

            <div className={styles.achievementsSection}>
                <h3 className={styles.achievementsTitle}>What you&apos;ve accomplished:</h3>
                <ul className={styles.achievementsList}>
                    {achievements.map((item, index) => (
                        <li key={index} className={styles.achievementItem}>
                            <span className={styles.achievementEmoji}>{item.emoji}</span>
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.messageBox}>
                <p className={styles.messageTitle}>You&apos;re now a DeFi explorer! 🚀</p>
                <p className={styles.messageText}>
                    The world of DeFi is vast and always evolving. Keep experimenting, 
                    stay curious, and remember: not your keys, not your crypto!
                </p>
            </div>

            <div className={styles.socialSection}>
                <p>Share your achievement:</p>
                <a 
                    href="https://x.com/intent/tweet?text=I%20just%20completed%20Fast%20DeFi%20and%20learned%20the%20fundamentals%20of%20DeFi!%20🎉%20%40fastdefi" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.shareButton}>
                    Share on 𝕏
                </a>
            </div>

            <div className={styles.footer}>
                <p>Questions? Feedback? We&apos;d love to hear from you!</p>
                <p>
                    <a href="https://x.com/fastdefi" target="_blank" rel="noopener noreferrer">
                        x.com/fastdefi
                    </a>
                </p>
            </div>

            <Spacer/>

            <Footer message="Back to Home" onClick={() => router.push('/')} isNextTopic={true}/>

        </div>
    );
}
