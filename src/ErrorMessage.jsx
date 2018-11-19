/*Error message component */

import React from 'react';

const ErrorMessage = (props)=><div className="alert alert-danger">{props.message}</div>;

export default ErrorMessage;