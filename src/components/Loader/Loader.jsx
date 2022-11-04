import PropTypes from 'prop-types';
import { Bars } from 'react-loader-spinner';

export const Loader = ({ visible }) => {
  return (
    <div className="loader-wrapper">
      <Bars
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={visible}
      />
    </div>
  );
};
Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};
