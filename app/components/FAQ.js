import styles from './FAQ.module.css';

const FAQ = ({children}) => {
    return (
        <div className={styles.faqArea}>
            {children}
        </div>
    )
}

export default FAQ;