function FormRoomDetails({ room })
{
    return (
        <div className="flex flex-row justify-between gap-3">
            <div className="flex flex-col gap-4">
                <label>Mã phòng chiếu: </label>
                <label>Tên phòng chiếu: </label>
                <label className="flex flex-row gap-4">Sức chứa: </label>
                <label>Trạng thái: </label>
            </div>
            <div className="flex flex-col gap-4 flex-grow">
                <span name="name" type="text" className="border border-black w-full" >{ room?.id }</span>
                <span name="capacity" type="number" className="border border-black w-full" >{ room?.name }</span>
                <span name="capacity" type="number" className="border border-black w-full" >{ room?.capacity }</span>
                <span name="capacity" type="number" className="border border-black w-full" >{ room?.status ? "Hoạt động" : "Ngừng hoạt dộng" }</span>
            </div>
        </div>
    );
}

export default FormRoomDetails;