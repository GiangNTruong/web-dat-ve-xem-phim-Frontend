import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { LOAD_STATUS } from "../../../constants";
import {
  fetchAllUsers,
  updateUserStatus,
} from "../../../services/adminServices/userServices";
import "./index.scss";
import Button from "@mui/material/Button";
import { formatDate } from "../../../util";

export default function UserManagement() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.user);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState("id");
  const [sortDirection, setSortDirection] = useState("ASC");

  useEffect(() => {
    dispatch(fetchAllUsers({ page, search, sortOption, sortDirection }));
  }, [dispatch, page, search, sortOption, sortDirection]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    setSortDirection(e.target.value);
  };

  const handleStatusToggle = (userId) => {
    dispatch(updateUserStatus(userId));
  };

  return (
    <main className="ra-listuser">
      <h1 className="text-[30px]">List user</h1>
      <TextField
        id="filled-basic"
        label="Search"
        variant="filled"
        onChange={handleChangeSearch}
        value={search}
      />
      <div>
        <label>Sắp xếp theo: </label>
        <Select value={sortOption} onChange={handleSortOptionChange}>
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="username">Username</MenuItem>
          <MenuItem value="email">Email</MenuItem>
        </Select>
        <Select value={sortDirection} onChange={handleSortDirectionChange}>
          <MenuItem value="ASC">Ascending</MenuItem>
          <MenuItem value="DESC">Descending</MenuItem>
        </Select>
      </div>
      {loading === LOAD_STATUS.FULLFILLED ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">STT</TableCell>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">FullName</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone</TableCell>
                  <TableCell align="center">Address</TableCell>
                  {/* <TableCell align="center">Birth Date</TableCell> */}
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Chức năng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.content?.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">
                      {data && data.size * (page - 1) + index + 1}
                    </TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.fullName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.phone}</TableCell>
                    <TableCell align="center">{user.address}</TableCell>
                    {/* <TableCell align="center">
                      {formatDate(user.birthDate)}
                    </TableCell>{" "} */}
                    {/* Sử dụng hàm formatDate */}
                    <TableCell align="center">
                      {user.status ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleStatusToggle(user.id)}
                      >
                        Status
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            count={data?.totalPages}
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
