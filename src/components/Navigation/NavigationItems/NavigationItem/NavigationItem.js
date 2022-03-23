import styles from './NavigationItem.module.css'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => (

    <li className={styles.NavigationItem}>
        <NavLink 
            // className={props.active ? styles.active:null}
            activeClassName={styles.active}
            exact={props.exact}
            to={props.link}>
            {props.children}</NavLink>
    </li>
);

NavigationItem.propTypes = {
    link: PropTypes.string,
    active: PropTypes.bool
}

export default NavigationItem;