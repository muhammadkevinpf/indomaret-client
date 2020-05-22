import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getChangedPrice } from "../redux/actions/productActions";
import MaterialTable from "material-table";
import dayjs from "dayjs";
export const TableProducts = (props) => {
  const {
    getChangedPrice,
    product: { table },
  } = props;
  useEffect(() => {
    async function getProductPrice() {
      await getChangedPrice();
    }
    getProductPrice();
  }, [getChangedPrice]);

  let prod = table;

  for (let i = 0; i < prod.length; i++) {
    prod[i].createdAt = dayjs(prod[i].createdAt).format("DD MMMM YYYY h:mm a");
  }

  return (
    <MaterialTable
      options={{
        exportButton: true,
      }}
      actions={[
        {
          icon: "link",
          tooltip: "Menuju Produk",
          onClick: (event, rowData) =>
            (window.location.href = `/products/${rowData.productId}`),
        },
      ]}
      columns={[
        { title: "Nama", field: "name" },
        { title: "Sebelum", field: "prevPrice" },
        { title: "Sesudah", field: "updatedPrice" },
        { title: "Alasan", field: "reason" },
        { title: "Tanggal", field: "createdAt" },
      ]}
      data={prod}
      title="Perubahan Harga"
    />
  );
};

const mapStateToProps = (state) => ({
  product: state.product,
});

const mapDispatchToProps = {
  getChangedPrice,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableProducts);
