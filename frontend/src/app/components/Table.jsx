import React from "react";
import { ReactNode } from "react";
import { GoPencil } from "react-icons/go";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import Button from "@/app/components/Button";
import classNames from "classnames";


const Table = ({ children }) => {
  return (
    <div className="w-full overflow-x-auto max-w-[1200px] bg-white shadow-md rounded-lg p-4 dark:bg-black-700">
      <table className="min-w-full max-w-[1200px] border-collapse">
        {children}
      </table>
    </div>
  );
};

const  TableHead = ({ children, actions = false }) => {
  return (
    <thead className="bg-gray-200 rounded-lg dark:bg-black-800">
      <tr>
        {children}
        {actions && (
          <th className="text-start h-10 px-3 py-2 text-nowrap font-bold text-xs last:rounded-r-lg text-gray-600 uppercase w-[50px] dark:text-gray-300">
            Acciones
          </th>
        )}
      </tr>
    </thead>
  );
};

const TableColumn = ({ children }) => {
  return (
    <th className="text-start h-10 px-3 py-2 text-nowrap font-bold text-xs text-gray-600 first:rounded-l-lg last:rounded-r-lg uppercase dark:text-gray-300">
      {children}
    </th>
  );
};

const TableBody = ({ children }) => {
  return <tbody className="bg-white dark:bg-black-700">{React.Children.count(children) > 0 ? children : <tr className=""><td colSpan={7} className="text-base text-gray-600 dark:text-gray-300 text-center p-5">No hay información para mostrar.</td></tr>}</tbody>;
};

const TableRow = ({ children, onClick='' }) => {
  return (
    <tr className="">
      {children}
      {onClick && (
        <td className="flex justify-center items-center gap-3 px-3 py-2 text-nowrap first:rounded-l-lg dark:text-gray-100">
          <Button icon className="text-gray-700 dark:text-gray-400" onClick={() => onClick("view")}>
            <IoEyeOutline className="text-xl font-normal" />
          </Button>

          <Button icon className="text-gray-700 dark:text-gray-400" onClick={() => onClick("edit")}>
            <GoPencil className="text-xl" />
          </Button>

          <Button icon className="text-rose-600 dark:text-rose-700" onClick={() => onClick("delete")}>
            <IoTrashOutline className="text-xl" />
          </Button>
        </td>
      )}
    </tr>
  );
};

const TableCell = ({ children, className = '' }) => {
  const cellProps = classNames (
    "min-w-[50px] text-start px-3 py-2 text-nowrap text-gray-600 text-sm dark:text-gray-100", className || ''
  )
  return (
    <td className={cellProps}>
      {children}
    </td>
  );
};

const TableCellInfo = ({ children }) => {
  return (
    <p className="text-sm text-gray-400 dark:text-black-100">{children}</p>
  );
};

Table.Head = TableHead;
Table.Row = TableRow;
Table.Column = TableColumn;
Table.Body = TableBody;
Table.Cell = TableCell;
Table.CellInfo = TableCellInfo;

export default Table