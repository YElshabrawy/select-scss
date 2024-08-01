import Image from 'next/image';
import styles from './page.module.css';
import Select from '@/components/Select';

export default function Home() {
    const days = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];
    return (
        <main className={styles.main}>
            <Select items={days} name={'days'} isMultiple={true} />
            <Select items={days} name={'day'} isMultiple={false} />
        </main>
    );
}
