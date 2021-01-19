// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const Name = () => {
    const [name, setName] = React.useState('')

    return (
        <div>
            <label htmlFor="name">Name: </label>
            <input
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
            />
        </div>
    )
}

const FavoriteAnimal = ({animal, onChange}) => (
    <div>
        <label htmlFor="animal">Favorite Animal: </label>
        <input id="animal" value={animal} {...{onChange}} />
    </div>
)

const Display = ({animal}) => <div>{`Your favorite animal is: ${animal}!`}</div>

const App = () => {
    const [animal, setAnimal] = React.useState('')

    return (
        <form>
            <Name />
            <FavoriteAnimal
                {...{animal}}
                onChange={e => {
                    setAnimal(e.target.value)
                }}
            />
            <Display {...{animal}} />
        </form>
    )
}

export default App
