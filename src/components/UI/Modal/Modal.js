import React, {Component} from 'react';
import styles from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }
    //! add Style to props
    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={styles.Modal} style={{
                    transform: this.props.show ? 'translateY(0)':'translateY(-100vh)',
                    opacity: this.props.show ? '1':'0',
                }}>
                    {this.props.children}
                </div>
            </>
        )
    }
}

Modal.propTypes = {
    show: PropTypes.any,
    modalClosed: PropTypes.func,
}

export default Modal;