// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useState, useEffect} from 'react'

const useLocalStorageState = (key, defaultValue = '') => {
    const [state, setState] = useState(
        () => window.localStorage.getItem(key) || defaultValue,
    )

    useEffect(() => {
        window.localStorage.setItem(key, state)
    }, [key, state])

    return [state, setState]
}

const Greeting = ({initialName = ''}) => {
    const [name, setName] = useLocalStorageState('name', initialName)

    const handleChange = event => {
        setName(event.target.value)
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name: </label>
                <input value={name} onChange={handleChange} id="name" />
            </form>
            {name ? <strong>Hello {name}</strong> : 'Please type your name'}
        </div>
    )
}

const App = () => {
    return <Greeting initialName="George" />
}

export default App
