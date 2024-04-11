const Alert = ({ alert }) => {
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle p" />
                {alert.msg}
            </div>
        )
    );
};

export default Alert;
