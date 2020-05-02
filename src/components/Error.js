import React from 'react';

const Error = ({ errorMsg }) => {
return <div role="alert" class="fade alert alert-danger show">{errorMsg}</div>
}

export default Error;