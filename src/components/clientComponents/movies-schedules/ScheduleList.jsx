import ScheduleItem from "./ScheduleItem";



export default function ScheduleList() {
  return (
    <>
      <div className="grid grid-cols-2 mx-5  p-3 gap-4">
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
        <ScheduleItem />
      </div>
    </>
  );
}
