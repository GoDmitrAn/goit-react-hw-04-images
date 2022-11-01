export const LoadMoreBtn = ({ children, onLoadMore }) => {
  return (
    <button type="button" className="Button" onClick={onLoadMore}>
      {children}
    </button>
  );
};
