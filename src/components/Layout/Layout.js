import React from 'react';
import styles from './Layout.module.css'

const Layout = (props) => (
    <>
    {/* <Aux> */}
        <div>Toolbar, Side drawer, Backdrop</div>
        <main className={styles.Content}>
            {props.children}
        </main>
    {/* </Aux> */}
    </>
);

export default Layout;