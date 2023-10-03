import ReactPaginate from 'react-paginate';
import styles from './Paginate.module.scss';

const Paginate = ({ onChangePage }) => {
  return (
    <div>
      <ReactPaginate
        className={styles.paginate}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Paginate;
