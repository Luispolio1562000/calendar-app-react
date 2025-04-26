import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

const newEvent = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: "#fafafa",
  user: {
    _id: "123",
    name: "Luis",
  },
};
export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { setActiveElement, onClearActiveEventInStore } = useCalendarStore();
  const handleClickNewEvent = () => {
    onClearActiveEventInStore();
    setActiveElement(newEvent);
    openDateModal();
  };
  return (
    <button className="btn btn-primary fab" onClick={handleClickNewEvent}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
