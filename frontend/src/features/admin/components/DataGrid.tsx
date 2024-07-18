import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DataGrid = ({ data, checkList, setCheckList }: any) => {
  const navigate = useNavigate();

  const checkSelected = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (e.target.checked) setCheckList((prev: any) => prev.concat(id));
    else setCheckList((prev: any) => prev.filter((ele: any) => ele !== id));
  };

  const checkAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!data) return;
    if (e.target.checked) setCheckList(data?.map((ele: any) => ele.id));
    else setCheckList([]);
  };

  return (
    <table className="data-grid w-full">
      <tbody>
        <tr>
          <th>
            <input
              type="checkbox"
              checked={checkList.length === data.length}
              onChange={(e) => checkAll(e)}
            />
          </th>
          {Object.keys(data[0]).map((e, idx) => (
            <th key={idx}>{e}</th>
          ))}
        </tr>
        {data.map((ele: any) => (
          <tr
            className="cursor-pointer"
            key={ele.id}
            onClick={() => navigate(`${ele.id}`)}
          >
            <th className="cursor-default" onClick={(e) => e.stopPropagation()}>
              <input
                type="checkbox"
                checked={checkList.includes(ele.id)}
                onChange={(e) => checkSelected(e, ele.id)}
              />
            </th>
            {Object.values(ele).map((value: any, idx) => (
              <td key={idx}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataGrid;
