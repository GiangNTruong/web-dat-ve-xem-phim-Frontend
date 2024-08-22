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

import { LOAD_STATUS } from "../../../constants";
import {
  deleteTicketPrice,
  fetchAllTicketPrices,
} from "../../../services/adminServices/ticketServices";
import FormAddTicket from "../../../components/adminComponents/ticket/FormAddTicket";
import FormEditTicket from "../../../components/adminComponents/ticket/FormEditTicket";

export default function TicketPriceManagement() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.ticketPrice);
  const [page, setPage] = useState(1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTicketPrice, setSelectedTicketPrice] = useState(null);
  console.log(data);

  useEffect(() => {
    dispatch(fetchAllTicketPrices({ page }));
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleShowAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleShowEditForm = (ticketPrice) => {
    setSelectedTicketPrice(ticketPrice);
    setShowEditForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this ticket price?")) {
      dispatch(deleteTicketPrice(id)).then(() => {
        dispatch(fetchAllTicketPrices({ page }));
      });
    }
  };

  const handleFormSuccess = () => {
    dispatch(fetchAllTicketPrices({ page }));
  };

  return (
    <main className="ra-listuser">
      <h1 className="text-[30px]">List Ticket Prices</h1>
      <Button variant="contained" onClick={handleShowAddForm}>
        {showAddForm ? "Close Form" : "Add Ticket Price"}
      </Button>
      {showAddForm && (
        <FormAddTicket
          onSuccess={handleFormSuccess}
          onClose={handleShowAddForm}
        />
      )}
      {showEditForm && selectedTicketPrice && (
        <FormEditTicket
          ticketPrice={selectedTicketPrice}
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
                  <TableCell align="center">Standard Price</TableCell>
                  <TableCell align="center">Sweetbox Price</TableCell>
                  <TableCell align="center">VIP Price</TableCell>
                  <TableCell align="center">Time Period</TableCell>
                  <TableCell align="center">Weekend Rate</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.content?.map((ticketPrice, index) => (
                  <TableRow key={ticketPrice.id}>
                    <TableCell align="center">
                      {data?.size * (page - 1) + index + 1}
                    </TableCell>
                    <TableCell align="center">
                      {ticketPrice.standardPrice}
                    </TableCell>
                    <TableCell align="center">
                      {ticketPrice.sweetboxPrice}
                    </TableCell>
                    <TableCell align="center">{ticketPrice.vipPrice}</TableCell>
                    <TableCell align="center">
                      {ticketPrice.timePeriod}
                    </TableCell>
                    <TableCell align="center">
                      {ticketPrice.weekendRate}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        onClick={() => handleShowEditForm(ticketPrice)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDelete(ticketPrice.id)}
                      >
                        Delete
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
