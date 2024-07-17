import PropTypes from 'prop-types'

export default function InputBox({headerName, type}) {
    return (
        <input type={type} name={headerName}></input>
    );
}

InputBox.propTypes = {
    headerName: PropTypes.string,
    type: PropTypes.string
}