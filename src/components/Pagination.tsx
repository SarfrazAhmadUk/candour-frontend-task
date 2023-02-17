import { IPagination } from '../types/Pagination';
import { ReactComponent as LeftArrow } from './../icons/left-arrow.svg';
import { ReactComponent as RightArrow } from './../icons/right-arrow.svg';

interface IPaginationProps {
  pagination: IPagination;
  handlePrevious: () => void;
  handlePagination: (page: number) => void;
  handleNext: () => void;
};

export function Pagination({
  pagination,
  handlePrevious,
  handlePagination,
  handleNext
}: IPaginationProps): JSX.Element {
  return (
    <div className="pagination">
      <button onClick={handlePrevious} className={`arrow ${pagination.page > 1 ? "active" : ""}`}>
        <LeftArrow />
      </button>
      <div className="dots">
        <ul>
          {
            new Array(pagination.total_pages).fill(null).map((item, i) => (
              <li onClick={() => handlePagination(i + 1)} key={i} className={pagination.page === i + 1 ? "active" : ""}>{i + 1}</li>
            ))
          }
        </ul>
      </div>
      <button onClick={handleNext} className={`arrow ${pagination.page < pagination.total_pages ? "active" : ""}`}>
        <RightArrow />
      </button>
    </div>
  )
}
