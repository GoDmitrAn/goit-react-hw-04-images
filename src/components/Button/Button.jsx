import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
export const LoadMoreBtn = ({ children, onLoadMore }) => {
  return (
    <Button
      variant="contained"
      onClick={onLoadMore}
      className="Button"
      sx={{
        display: 'flex',
        margin: 'auto',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    >
      {children}
    </Button>
  );
};
LoadMoreBtn.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
