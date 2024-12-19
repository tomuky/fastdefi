import classes from '@/app/(pages)/Pages.module.css';
import Image from 'next/image';

const ListIcon = ({children, style, type='note'}) => {  
    const getIconPath = () => {
        switch (type) {
            case 'note':
                return '/images/ui/info-icon.png';
            case 'finish':
                return '/images/ui/finish.png';
            case 'caution':
                return '/images/ui/caution.png';
            case 'remember':
                return '/images/ui/push-pin.png';
            default:
                return '/images/ui/info-icon.png'; // fallback to info icon
        }
    };
    
    return (
        <div className={classes.note} style={style}>
            <Image 
                src={getIconPath()} 
                alt={`${type || 'info'} icon`}
                className={classes.noteIcon}
                width={24}
                height={24}
            />
            <span>{children}</span>
        </div>
    )
}

export default ListIcon;