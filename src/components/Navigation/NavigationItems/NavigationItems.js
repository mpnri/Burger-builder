import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css'
const NavigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
);

export default NavigationItems;
