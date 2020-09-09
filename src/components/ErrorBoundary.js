import React from 'react';

class ErrorBoundary extends React.Component{
    constructor() {
        super();
        this.state = {
            hasError : false
        }
    }

    componentDidCatch() {
        this.setState({hasError : true})
    }

    render() {
        if(this.state.hasError) {
            return (<h1>Oops! Something went wrong.</h1>)
        }
        return this.props.children;
    }
}

export default ErrorBoundary;