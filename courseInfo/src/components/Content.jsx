import Header from './Header'
import Part from './Part'

const Content = ({ name, parts }) => {
    const parties = [...parts]
    const total = parties.reduce((sum, part) => sum + part.exercises, 0)
    return (
        <>
            <Header courseName={name} />
            <ol>
            {parties.map((part) => <Part key={part.id} part={part} />)}
            </ol>
            <h3>Total of {total} exercises</h3>
        </>
    )
}

  export default Content