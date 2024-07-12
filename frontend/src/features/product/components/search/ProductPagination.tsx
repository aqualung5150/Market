import { Link, useLocation, useSearchParams } from "react-router-dom";
import { ReactComponent as AngleLeft } from "assets/angleLeft.svg";
import { ReactComponent as AngleRight } from "assets/angleRight.svg";
import { ReactComponent as AngleDoubleLeft } from "assets/angleDoubleLeft.svg";
import { ReactComponent as AngleDoubleRight } from "assets/angleDoubleRight.svg";
import { PaginationProps } from "types/product";

const ProductPagination = ({
  totalSize,
  displaySize,
  interval,
  page,
}: PaginationProps) => {
  const { pathname, search } = useLocation();
  const path = pathname + search;

  const lastPage = Math.ceil(totalSize / displaySize);
  const left = Math.floor((page - 1) / interval) * interval + 1;
  const right = Math.ceil(page / interval) * interval;
  const pageNumbers: number[] = [];
  for (let i = left; i <= right && i <= lastPage; ++i) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex h-14 w-full items-center justify-center gap-1 pb-5 text-lg font-semibold">
      {page !== 1 && (
        <>
          <li>
            <Link
              to={path.replace(
                /page=\d+/g,
                `page=${left === 1 ? 1 : left - interval}`,
              )}
            >
              <AngleDoubleLeft className="h-8 w-8 hover:rounded-md hover:bg-gray-100" />
            </Link>
          </li>
          <li>
            <Link
              to={path.replace(
                /page=\d+/g,
                `page=${page === 1 ? page : page - 1}`,
              )}
            >
              <AngleLeft className="h-8 w-8 hover:rounded-md hover:bg-gray-100" />
            </Link>
          </li>
        </>
      )}

      {pageNumbers.map((e) => (
        <li
          key={e}
          className={`h-8 w-fit min-w-8 rounded-md ${page === e ? "bg-green-500 text-white" : "hover:bg-gray-100"}`}
        >
          <Link
            className="flex h-full w-full items-center justify-center p-1"
            to={path.replace(/page=\d+/g, `page=${e}`)}
          >
            {e}
          </Link>
        </li>
      ))}
      {page !== lastPage && (
        <>
          <li>
            <Link
              to={path.replace(
                /page=\d+/g,
                `page=${page === lastPage ? page : page + 1}`,
              )}
            >
              <AngleRight className="h-8 w-8 hover:rounded-md hover:bg-gray-100" />
            </Link>
          </li>
          <li>
            <Link
              to={path.replace(
                /page=\d+/g,
                `page=${right + 1 > lastPage ? Math.min(lastPage, right) : right + 1}`,
              )}
            >
              <AngleDoubleRight className="h-8 w-8 hover:rounded-md hover:bg-gray-100" />
            </Link>
          </li>
        </>
      )}
    </ul>
  );
};

export default ProductPagination;
