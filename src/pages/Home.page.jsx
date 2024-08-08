import React from 'react'
import Navigation from '../components/Navigation'
import UserList from '../components/UserList'

function HomePage() {
    return (
        <div>
            <Navigation />
            <hr />
            <UserList />
        </div>
    )
}

export default HomePage