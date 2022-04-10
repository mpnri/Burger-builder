import styles from './Button.module.css'
import PropTypes from 'prop-types'

const Button = props => (
    <button
        disabled={props.disabled}
        className={[styles.Button, styles[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);

Button.propTypes = {
    btnType: PropTypes.string,
    clicked: PropTypes.func
}

export default Button;