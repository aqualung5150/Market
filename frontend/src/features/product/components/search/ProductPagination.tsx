import { Link, useLocation } from "react-router-dom";
import { ReactComponent as AngleLeft } from "assets/angleLeft.svg";
import { ReactComponent as AngleRight } from "assets/angleRight.svg";

const ProductPagination = ({ totalSize, page }: any) => {
  console.log("totalSize: " + totalSize);
  page = parseInt(page);
  const { pathname, search } = useLocation();
  const path = pathname + search;

  const pageNumbers: number[] = [];
  for (let i = 1; i <= Math.ceil(totalSize / 10); ++i) {
    pageNumbers.push(i);
  }

  return (
    <ul className="flex h-20 w-full items-center justify-center text-lg font-semibold">
      <li>
        <Link
          to={path.replace(/page=\d+/g, `page=${page === 1 ? page : page - 1}`)}
        >
          <AngleLeft className="h-8 w-8" />
        </Link>
      </li>
      {pageNumbers.map((e) => (
        <li
          key={e}
          className={`h-8 w-8 ${page === e && "rounded-md bg-green-500 text-white"}`}
        >
          <Link
            className="flex h-full w-full items-center justify-center"
            to={path.replace(/page=\d+/g, `page=${e}`)}
          >
            {e}
          </Link>
        </li>
      ))}
      <li>
        <Link
          to={path.replace(
            /page=\d+/g,
            `page=${page === pageNumbers.pop() ? page : page + 1}`,
          )}
        >
          <AngleRight className="h-8 w-8" />
        </Link>
      </li>
    </ul>
  );
};

export default ProductPagination;
