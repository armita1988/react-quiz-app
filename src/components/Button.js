
export default function Button({ dispatch, action, children, disabled = false }) {

    return (
        <button
            className={`btn ${disabled ? 'btn-disabled' : ''}`}
            onClick={() => { dispatch(action) }}
            disabled={disabled}>
            {children}
        </button>
    );
}