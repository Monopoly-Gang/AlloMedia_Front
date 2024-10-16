import App from '../../App';
import PropTypes from 'prop-types';


const BlankLayout = ({ children }) => {
    return (
        <App>
            <div className="text-black dark:text-white-dark min-h-screen">{children}</div>
        </App>
    );
};

BlankLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default BlankLayout;
