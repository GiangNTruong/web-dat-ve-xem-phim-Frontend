import  { useEffect, useState } from 'react'
import "./BannerManagement.css"
import { LOAD_STATUS } from '../../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'antd';
import { createBanner, deleteBanner, fetchAllBanner, updateBanner } from '../../../services/adminServices/bannerServices';
import { CircularProgress } from '@mui/material';
export default function BannerManagement() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.banner);
  const [bannerUpdate, setBannerUpdate] = useState({
    //every field here must be the same with input name.
    imageUrl: "",
    status: "",
    title: "",
  });
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
  const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  //CREATE
  const showModalCreate = () => {

    setIsModalCreateOpen(true);
  };
  const handleCancelCreate= () => {
    setIsModalCreateOpen(false);
  };

  const handleSubmitCreate = (e) => {
    e.preventDefault();
    console.log("e", bannerUpdate);
    dispatch(createBanner(bannerUpdate));
    setIsModalCreateOpen(false);
  };


  //DELETE
  const showModalDelete = (bannerDelete) => {
    setBannerUpdate(bannerDelete);
    setIsModalDeleteOpen(true);
  };
  const handleCancelDelete = () => {
    setIsModalDeleteOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteBanner(bannerUpdate));
    setIsModalDeleteOpen(false);
  };

  //UPDATE
  const showModalUpdate = (banner) => {
    setBannerUpdate(banner);
    setIsModalUpdateOpen(true);
  };
  const handleCancelUpdate = () => {
    setIsModalUpdateOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateBanner(bannerUpdate));

    setIsModalUpdateOpen(false);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setBannerUpdate({
      ...bannerUpdate,
      [name]: value,
    });
  };

  useEffect(() => {
    dispatch(fetchAllBanner());
  }, [dispatch]);

  return (
    <>
      <main className="ra-listuser">
        <h1 className="text-[30px]">List Banner</h1>

        <Modal
          title="Update"
          open={isModalUpdateOpen}
          onOk={handleCancelUpdate}
          onCancel={handleCancelUpdate}
        >
          <form onSubmit={handleSubmit} className="gap-2">
            <div className="m-1">
              <label className>imageUrl</label>
              <input
                className="p-1 mx-1"
                type="text"
                placeholder="imageUrl"
                name="imageUrl"
                value={bannerUpdate?.imageUrl}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>title</label>
              <input
                type="text"
                className="p-1 mx-1"
                placeholder="title"
                name="title"
                value={bannerUpdate?.title}
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>status</label>
              <select
                className="p-1 mx-1"
                value={bannerUpdate?.status}
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

        <Modal
          title="Create New Banner"
          open={isModalCreateOpen}
          onOk={handleCancelCreate}
          onCancel={handleCancelCreate}
        >
     
          <form onSubmit={handleSubmitCreate} className="gap-2">
            <div className="m-1">
              <label className>imageUrl</label>
              <input
                className="p-1 mx-1"
                type="text"
                placeholder="imageUrl"
                name="imageUrl"
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>title</label>
              <input
                type="text"
                className="p-1 mx-1"
                placeholder="title"
                name="title"
                onChange={handleOnChange}
              />
            </div>
            <div className="m-1">
              <label>status</label>
              <select
                className="p-1 mx-1"
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
                Create
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          title="Delete"
          open={isModalDeleteOpen}
          onOk={handleDelete}
          onCancel={handleCancelDelete}
        >
          Do you want to delete it?
        </Modal>

        <button
          type="button"
          className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800"
          onClick={
            showModalCreate
          }
        >
          Create New Banner
        </button>

        {error && <p>{error}</p>}
        {loading === LOAD_STATUS.FULLFILLED ? (
          <>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>IMG</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((banner) => {
                  return (
                    <tr key={banner.id}>
                      <td>{banner.id}</td>
                      <td>
                        <img
                          src={banner.img}
                          alt=""
                          className="w-[100px] h-[100px]"
                        />
                      </td>
                      <td>{banner.title}</td>
                      <td>{banner.status ? "Active" : "Inactive"}</td>
                      <td>
                        <button
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                          onClick={() => {
                            showModalUpdate(banner);
                          }}
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                          onClick={() => {
                            showModalDelete(banner);
                          }}
                        >
                          Delete
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
