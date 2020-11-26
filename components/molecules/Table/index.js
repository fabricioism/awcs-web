import { Grid } from "gridjs-react";

const Table = ({ data, columns, search, pagination, isServer, ...rest }) => {
  return (
    <Grid
      data={data}
      columns={columns}
      search={search}
      pagination={
        isServer
          ? pagination
          : {
              enabled: pagination && true,
              limit: pagination,
            }
      }
      language={{
        search: {
          placeholder: "🔍 Buscar...",
        },
        pagination: {
          previous: "⬅️",
          next: "➡️",
          to: "-",
          of: "de",
          showing: "Mostrando",
          results: () => "resultados",
        },
      }}
      {...rest}
    />
  );
};

export default Table;
