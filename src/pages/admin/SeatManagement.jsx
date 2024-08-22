import { CircularProgress, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllSeats,
  updateSeats,
} from "../../services/adminServices/seatServices";
import { LOAD_STATUS } from "../../constants";
import "./SeatManagement.css";
import { Modal } from "antd";

export default function SeatManagement() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.seat);
  const [page, setPage] = useState(1);
  const [seatUpdate, setSeatUpdate] = useState({
    //every field here must be the same with input name.
    type: "",
    seatRow: "",
    number: "",
    isAvailable: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (seat) => {
    setSeatUpdate(seat);
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateSeats(seatUpdate));
    setIsModalOpen(false);
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setSeatUpdate({
      ...seatUpdate,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchAllSeats({ page }));
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <main className="ra-listuser">
        <h1 className="text-[30px]">List Seat</h1>

        <Modal
          title="Update"
          open={isModalOpen}
          onOk={handleCancel}
          onCancel={handleCancel}
        >
          <form onSubmit={handleSubmit} className="gap-2">
            <div className="m-1">
              <label className>Type</label>
              <input
                className="p-1 mx-1"
                type="text"
                placeholder="Type"
                name="type"
                value={seatUpdate?.type}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>Seat Row</label>
              <input
                type="text"
                className="p-1 mx-1"
                placeholder="Seat Row"
                name="seatRow"
                value={seatUpdate?.seatRow}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>number</label>
              <input
                type="number"
                name="number"
                className="p-1 mx-1"
                placeholder="number"
                value={seatUpdate?.number}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>IsAvailable</label>
              <select
                className="p-1 mx-1"
                value={seatUpdate?.isAvailable}
                onChange={handleOnChange}
              >
                <option value="true">Active</option>
                <option value="false">In Active</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Update
              </button>
            </div>
          </form>
        </Modal>

        {error && <p>{error}</p>}
        {loading == LOAD_STATUS.FULLFILLED ? (
          <>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Type</th>
                  <th>Seat Row</th>
                  <th>Number</th>
                  <th>Is Available</th>
                  <th>RoomID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.content?.map((seat) => {
                  return (
                    <tr key={seat.id}>
                      <td> {seat.id}</td>
                      <td>{seat.type}</td>
                      <td>{seat.seatRow}</td>
                      <td>{seat.number}</td>
                      <td>{seat.isAvailable ? "Active" : "Inactive"}</td>
                      <td>{seat.room.id}</td>
                      <td>
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => {
                            showModal(seat);
                          }}
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
    </>
  );
}
