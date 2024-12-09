import Image from 'next/image';
import classes from './PageTitle.module.css';

const PageTitle = ({ title, image }) => {
    return (
        <div className={classes.title}>
            <Image 
                src={image} 
                alt={title} 
                className={classes.titleImage}
                width={60}
                height={60}
            />
            {title}
        </div>
    );
};

export default PageTitle;