import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import './App.css'
import Scroll from '../components/Scroll'
import ErrorBoundary from '../components/ErrorBoundary';

import { connect } from 'react-redux';
import { setSearchField, requestRobots } from '../actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        isPending: state.requestRobots.isPending,
        robots: state.requestRobots.robots,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchBoxValueChange: event => dispatch(setSearchField(event.target.value)),
        onRequestRobots: () => requestRobots(dispatch)
    }
}

class App extends React.Component {

    componentDidMount() {
        this.props.onRequestRobots()
    }

    render() {
        const { searchField, robots, onSearchBoxValueChange, isPending } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        if(isPending) {
            return (<h1 className='tc'>Loading...</h1>)
        } else {
            return (
                <div className='tc'>
                    <header>Robofriends</header>
                    <SearchBox searchChange={onSearchBoxValueChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                    <footer>
                        Made with <span role='img' aria-label='Love'>❤️</span> from India.
                    </footer>
                </div>
            )
        }
    }
}





export default connect(mapStateToProps, mapDispatchToProps)(App);