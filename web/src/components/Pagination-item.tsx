import Link from 'next/link';
import styles from '../styles/pagination.module.css'

type Pagination = {
  items: number[],
  skip: number,
  currentPage: number,
  paginationCount: number,
}

export default function PaginationItem(
  {
    items,
    skip,
    currentPage,
    paginationCount,
  }: Pagination,
) {
  return (

    <div className="d-flex flex-row justify-content-start mb-3">
      <div className='py-2 bg-body-secondary'>
        <Link className={`${styles.paginationItem} ${styles.paginationBorder_r_left}`} href={`/?page=${currentPage > 10 ? currentPage - 10 : 1}&take=${skip}`}>{'<<'}</Link>
        <Link className={`${styles.paginationItem}`} href={`/?page=${currentPage > 1 ? currentPage - 1 : 1}&take=${skip}`}>{'<'}</Link>
        {
          items.map((item: number) => (
            <Link
              key={item}
              href={`/?page=${item}&take=${skip}`}
              className={
                `${styles.paginationItem} ${(item === currentPage ? styles.active : '')}`
              }
            >
              {item}
            </Link>
          ))
        }
        <Link className={`${styles.paginationItem}`}
              href={`/?page=${currentPage < paginationCount ? currentPage + 1 : paginationCount}&take=${skip}`}>{">"}</Link>
        <Link className={`${styles.paginationItem} ${styles.paginationBorder_r_right}`}
              href={`/?page=${currentPage < (paginationCount - 10 ) ? currentPage + 10 : paginationCount}&take=${skip}`}>{">>"}</Link>
      </div>
    </div>

  );
}
