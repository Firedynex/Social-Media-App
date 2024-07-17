import PropTypes from 'prop-types'

export default function InputBox({headerName, type, placeholder}) {
    return (
        <input type={type} name={headerName} placeholder={placeholder}></input>
    );
}

InputBox.propTypes = {
    headerName: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string
}