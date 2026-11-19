import { Box, Pagination } from '@mui/material';

const ProductPagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const handleChange = (_event, value) => {
    onPageChange(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: 4,
        mb: 2,
      }}
    >
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        color="primary"
        shape="rounded"
        size="large"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default ProductPagination;