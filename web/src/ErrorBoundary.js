import React from 'react'

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false,
            error: ""
        }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        return this.setState({ error: error.message })
    }

    render() {
        if (this.state.hasError) {
            return <p>{this.state.error}</p>
        }

        return this.props.children
    }
}