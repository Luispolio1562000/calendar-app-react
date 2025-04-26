import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { deleteEvent, hasEventSelected } = useCalendarStore();
  const handleClickDeleteEvent = () => {
    deleteEvent();
  };
  return (
    <button
      className={`btn btn-danger fab-danger ${
        hasEventSelected ? "" : "d-none"
      } `}
      onClick={handleClickDeleteEvent}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
