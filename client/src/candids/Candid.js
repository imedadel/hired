import React from 'react';
import PropTypes from 'prop-types';

const Candid = props => (
    <div className="singleCandid">
        <img alt="user_image" className="userImage" src={`https://picsum.photos/70?random=${props.id}`} />
        <div className="textContent">
            <div className="singleCommentContent">
                <h3>{props.fullName}</h3>
                {props.children}
            </div>
            <div className="singleCommentButtons">
            </div>
        </div>
    </div>
);

Candid.propTypes = {
    fullName: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
    dateAdded: PropTypes.string.isRequired,
};

export default Candid;