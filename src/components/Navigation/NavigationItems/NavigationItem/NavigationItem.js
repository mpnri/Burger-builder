import styles from './NavigationItem.module.css'
import PropTypes from 'prop-types'

const NavigationItem = (props) => (

    <li className={styles.NavigationItem}>
        <a 
            className={props.active ? styles.active:null}
            href={props.link}>
            {props.children}</a>
    </li>
);

NavigationItem.propTypes = {
    link: PropTypes.string,
    active: PropTypes.bool
}

export default NavigationItem;