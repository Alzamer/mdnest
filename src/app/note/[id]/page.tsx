import styles from './style.module.css';
import Comments from '@/app/components/Comments';

export default function Page({ params } : { params : { id : number}}) {
  return <div className={styles.container}>
    <div className={styles.header}>TITLE</div>
    <div className={styles.content}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie nisl nec arcu vulputate tincidunt. Nunc at vehicula erat, vitae blandit lectus. Vivamus dapibus interdum arcu, quis dapibus ante suscipit vel. Quisque ullamcorper sodales sapien, sit amet varius orci sodales a. Suspendisse ultricies diam at pellentesque condimentum. Donec sed nisi tellus. Cras lacinia, quam vel porta blandit, risus elit ultricies lorem, volutpat euismod ante eros ut velit. Sed congue vel lorem eget tristique. Sed vel aliquet dui. Aliquam erat volutpat. Integer ornare nisi turpis, nec eleifend est condimentum eget. Aliquam erat volutpat. Fusce eu porta sem, non facilisis neque. Ut posuere, odio nec fringilla gravida, orci mauris convallis nulla, sit amet sodales mauris libero id quam. Aenean faucibus nulla sit amet pharetra aliquam. 
    </div>
    <Comments/>
  </div>;
}