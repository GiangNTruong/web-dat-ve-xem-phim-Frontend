import { Button } from "antd";
import { useDispatch } from "react-redux";
import { addRoom } from "../../../services/adminServices/roomService";
import { useState } from "react";

function FormAddRoom({ closeForm })
{
    const dispatch = useDispatch();
    const [ room, setRoom ] = useState(
        {
            // id: null,
            name: "",
            capacity: 0,
            // status: true,
        }
    );
    const handleAddRoom = () =>
    {
        // console.log(room);
        dispatch(addRoom(room)).then(closeForm());
    };
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
    return (
        <>
            <form >
                { console.log(room) }
                <div className="flex flex-row justify-between gap-3">
                    <div className="flex flex-col gap-4">
                        <label>Tên phòng chiếu: </label>
                        <label className="flex flex-row gap-4">Sức chứa: </label>
                    </div>
                    <div className="flex flex-col gap-4 flex-grow">
                        <input name="name" onChange={ handleChangeInput } type="text" className="border border-black w-full" />
                        <input name="capacity" onChange={ handleChangeInput } type="number" className="border border-black w-full" />
                    </div>
                </div>
                <Button type="primary" onClick={ handleAddRoom } className="mt-4">Thêm</Button>
            </form>
        </>
    );
}

export default FormAddRoom;