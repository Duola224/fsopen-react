const Notification = ({message}) => {
    if (!message) {
        return null
    }

    return (
        <div className="error">
            <p>{message}</p>
        </div>
    )
}

export default Notification