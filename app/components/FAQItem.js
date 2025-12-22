'use client';
import styles from './FAQ.module.css';
import { useState, useRef } from 'react';
import { useElasticHeight } from '@/app/_hooks/useElasticHeight';

const FAQItem = ({question, answer}) => {
    const [isOpen, setIsOpen] = useState(false);
    const answerRef = useRef(null);
    
    useElasticHeight(answerRef, isOpen);

    return (
        <div className={styles.faqItem} onClick={() => setIsOpen(!isOpen)}>
            <h3 className={styles.question}>
                <div className={styles.questionIcon}>{isOpen ? '-' : '+'}</div>
                {question}
            </h3>
            <div ref={answerRef} className={styles.answer}>
                <p>{answer}</p>
            </div>
        </div>
    )
}

export default FAQItem;