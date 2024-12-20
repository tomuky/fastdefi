'use client';
import styles from './FAQ.module.css';
import { useState } from 'react';

const FAQItem = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.faqItem} onClick={() => setIsOpen(!isOpen)}>
            <h3 className={styles.question}>
                <div className={styles.questionIcon}>{isOpen ? '-' : '+'}</div>
                {question}
            </h3>
            <div className={`${styles.answer} ${isOpen ? styles.open : ''}`}>
                <p>{answer}</p>
            </div>
        </div>
    )
}

export default FAQItem;