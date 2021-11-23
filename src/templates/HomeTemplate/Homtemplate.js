import React, { useEffect } from 'react'
import { Route } from 'react-router';
import Footer from './Layout/Footer/Footer';
import Header from './Layout/Header/Header';

export default function Homtemplate(props) { // path,exact,Component

    const { Component, ...restProps } = props;

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <Route {...restProps} render={(propsRoute) => { //props.location, props.history,props.match
            return <>
                <Header {...propsRoute} />

                <Component {...propsRoute} />
                <Footer {...propsRoute} />
            </>
        }} />
    )
}
