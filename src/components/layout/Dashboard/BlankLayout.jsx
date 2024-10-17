import React from 'react';
import PropTypes from 'prop-types';

const BlankLayout = ({ children }) => {
  return (
    <div className="text-black dark:text-white-dark min-h-screen">
      {children}
    </div>
  );
};

BlankLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BlankLayout;