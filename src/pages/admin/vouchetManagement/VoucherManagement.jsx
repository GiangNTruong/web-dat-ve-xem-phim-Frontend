import React, { useEffect, useState } from "react";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllDiscounts,
  deleteDiscount,
} from "../../../services/adminServices/discountServices";
import { LOAD_STATUS } from "../../../constants";
import FormAddDiscount from "../../../components/adminComponents/discount/FormAddDiscount";
import FormEditDiscount from "../../../components/adminComponents/discount/FormEditDiscount";

export default function VoucherManagement() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.discount);
  console.log(data);
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  useEffect(() => {
    dispatch(fetchAllDiscounts({ page }));
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleShowAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleShowEditForm = (discount) => {
    setSelectedDiscount(discount);
    setShowEditForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this discount?")) {
      dispatch(deleteDiscount(id)).then(() => {
        dispatch(fetchAllDiscounts({ page }));
      });
    }
  };

  const handleFormSuccess = () => {
    dispatch(fetchAllDiscounts({ page })); // reload data after success
  };

  return (
    <main className="ra-listuser">
      <h1 className="text-[30px]">List voucher</h1>
      <Button variant="contained" onClick={handleShowAddForm}>
        {showAddForm ? "Đóng Form" : "Thêm Discount"}
      </Button>
      {showAddForm && (
        <FormAddDiscount
          onSuccess={handleFormSuccess}
          onClose={handleShowAddForm}
        />
      )}
      {showEditForm && selectedDiscount && (
        <FormEditDiscount
          discount={selectedDiscount}
          onSuccess={() => {
            handleFormSuccess();
            setShowEditForm(false);
          }}
          onClose={() => setShowEditForm(false)}
        />
      )}
      {error && <p>{error}</p>}
      {loading === LOAD_STATUS.FULLFILLED ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead className="bg-pink-500">
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Mã Code</TableCell>
                  <TableCell align="center">Miêu tả</TableCell>
                  <TableCell align="center">Chiết khấu</TableCell>
                  <TableCell align="center">ImageUrl</TableCell>
                  <TableCell align="center">Sử dụng</TableCell>
                  <TableCell align="center">Bắt đầu</TableCell>
                  <TableCell align="center">Kết thúc</TableCell>
                  <TableCell align="center">Chức năng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.content?.map((discount, index) => (
                  <TableRow key={discount.id}>
                    <TableCell align="center">
                      {data && data.size * (page - 1) + index + 1}
                    </TableCell>
                    <TableCell align="center">{discount.code}</TableCell>
                    <TableCell align="center">{discount.description}</TableCell>
                    <TableCell align="center">
                      {discount.discountPercentage}%
                    </TableCell>
                    <TableCell align="center">
                      <img src={discount.imageUrl} alt="news" width="100" />
                    </TableCell>
                    <TableCell align="center">
                      {discount.isUsed ? "Yes" : "No"}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(discount.validFrom).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(discount.validTo).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleShowEditForm(discount)}
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(discount.id)}
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={Math.ceil(data.totalElements / data.size)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </>
      ) : (
        <CircularProgress />
      )}
    </main>
  );
}
