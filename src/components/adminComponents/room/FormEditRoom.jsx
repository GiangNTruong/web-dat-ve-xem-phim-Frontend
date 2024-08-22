import { Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editRoom } from "../../../services/adminServices/roomService";

function FormEditRoom({ roomToBeEdited, closeForm })
{
    const dispatch = useDispatch();
    const [ room, setRoom ] = useState(
        {
            id: roomToBeEdited?.id,
            name: roomToBeEdited?.name,
            capacity: roomToBeEdited?.capacity,
            status: roomToBeEdited?.status,
        }
    );
    const handleChangeInput = (e) =>
    {
        const { name, value } = e.target;
        setRoom(
            {
                ...room,
                [ name ]: value,
            }
        );
    };
    const handleEditRoom = () =>
    {
        dispatch(editRoom(room)).then(closeForm());
    };
    return (
        <>
            <form >
                <div className="flex flex-row justify-between gap-3">
                    <div className="flex flex-col gap-4">
                        <label>Tên phòng chiếu: </label>
                        <label className="flex flex-row gap-4">Sức chứa: </label>
                        <label>Trạng thái: </label>
                    </div>
                    <div className="flex flex-col gap-4 flex-grow">
                        <input name="name" onChange={ handleChangeInput } value={ roomToBeEdited?.name } type="text" className="border border-black w-full" />
                        <input name="capacity" onChange={ handleChangeInput } value={ roomToBeEdited?.capacity } type="number" className="border border-black w-full" />
                        <select defaultValue={ roomToBeEdited?.status } onChange={ handleChangeInput } className="border border-black w-full" name="status">
                            { console.log("ROOM IN VIEW", roomToBeEdited) }
                            <option value={ true }>Hoạt động</option>
                            <option value={ false }>Ngừng hoạt động</option>
                        </select>
                    </div>
                </div>
                <Button type="primary" onClick={ handleEditRoom } className="mt-4">Cập nhật</Button>
            </form>
        </>
    );
}

export default FormEditRoom;