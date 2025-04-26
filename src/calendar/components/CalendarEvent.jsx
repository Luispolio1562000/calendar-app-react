export const CalendarEvent = (props) => {
  //? Log de las props que envia el evento del calendario.
  //* console.log(props.event.title);

  return (
    <>
      <strong>{props.event.title}</strong>
      <span>{props.event.name}</span>
    </>
  );
};
