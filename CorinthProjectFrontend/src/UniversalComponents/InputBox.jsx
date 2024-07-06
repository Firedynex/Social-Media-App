import PropTypes from "prop-types";

export default function InputBox({headerName, type}) {
    return (
        <>
            <p>{headerName}</p>
            <input type={type} className="text-box" required/>
        </>   
    )
}

InputBox.propTypes = {
    headerName: PropTypes.string,
    type: PropTypes.string,
}

InputBox.defaultProps = {
    name: "Header Name",
    type: "text"
}