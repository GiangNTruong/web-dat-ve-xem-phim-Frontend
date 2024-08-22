import  { useEffect, useState } from "react";
import "./ReviewManagement.css";
import { Modal } from "antd";
import { LOAD_STATUS } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllReview, updateReview } from "../../../services/adminServices/reviewServices";
import { CircularProgress } from "@mui/material";
export default function ReviewManagement() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.review);
  console.log("data",data);
  const [reviewUpdate, setReviewUpdate] = useState({
    //every field here must be the same with input name.
    comment: "",
    rating: "",
    status: "",
    reviewDate: "",
  });
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const showModalUpdate = (review) => {
    setReviewUpdate(review);
    setIsModalUpdateOpen(true);
  };
  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateReview(reviewUpdate));

    setIsModalUpdateOpen(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setReviewUpdate({
      ...reviewUpdate,
      [name]: value,
    });
  };


    useEffect(() => {
      dispatch(fetchAllReview());
    }, [dispatch]);

  return (
    <>
      <main className="ra-listuser">
        <h1 className="text-[30px]">List Review</h1>

        <Modal
          title="Update"
          open={isModalUpdateOpen}
          onOk={handleCancelUpdate}
          onCancel={handleCancelUpdate}
        >
          <form onSubmit={handleSubmit} className="gap-2">
            <div className="m-1">
              <label className>comment</label>
              <input
                className="p-1 mx-1"
                type="text"
                placeholder="comment"
                name="comment"
                value={reviewUpdate?.comment}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>rating</label>
              <input
                type="text"
                className="p-1 mx-1"
                placeholder="rating"
                name="rating"
                value={reviewUpdate?.rating}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>reviewDate</label>
              <input
                type="text"
                className="p-1 mx-1"
                placeholder="reviewDate"
                name="reviewDate"
                value={reviewUpdate?.reviewDate}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>status</label>
              <select
                className="p-1 mx-1"
                value={reviewUpdate?.status}
                name="status"
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
        {loading === LOAD_STATUS.FULLFILLED ? (
          <>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Comment</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th>reviewDate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((review) => {
                  return (
                    <tr key={review.id}>
                      <td>{review.id}</td>
                      <td>{review.comment}</td>
                      <td>{review.rating}</td>
                      <td>{review.status ? "Active" : "Inactive"}</td>
                      <td>{review.reviewDate}</td>
                      <td>
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => {
                            showModalUpdate(review);
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
          </>
        ) : (
          <CircularProgress />
        )}
      </main>
    </>
  );
}
