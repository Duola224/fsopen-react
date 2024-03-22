import Content from "./Content"

const Course = (props) => {
    const coursesObj = [...props.courses]

    return (
        <>
            <h1>Web Development curriculum</h1>
            {coursesObj.map(course =>
                <Content key={course.id} name={course.name} parts={course.parts} />
            )}
        </>
    )

}

export default Course