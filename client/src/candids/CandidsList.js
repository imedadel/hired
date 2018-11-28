import React from 'react';
import PropTypes from 'prop-types';
import Candid from './Candid';

const CandidsList = (props) => {
    const candidsNodes = props.data.map(candids => (
        <Candid fullName={candids.fullName} key={candids.cuid} id={candids.cuid}>
            { candids.universitiesName }
        </Candid>
    ));
    return (
        <div>
            { candidsNodes }
        </div>
    );
};

CandidsList.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        fullName: PropTypes.string,
        cuid: PropTypes.string,
        universitiesName: PropTypes.array
    }))
};

CandidsList.defaultProps = {
    data: [],
};

export default CandidsList;