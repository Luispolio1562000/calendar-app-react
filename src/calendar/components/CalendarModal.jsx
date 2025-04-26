import { differenceInSeconds } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect, useMemo, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./CalendarModal.css";
import { useCalendarStore, useUiStore } from "../../hooks";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "90vw",
  },
};

Modal.setAppElement("#root");
export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const { activeElement, startSavingEvent } = useCalendarStore();

  //? Se comienza a manejar el state con redux, por lo que se comenta el useState.
  ///const [isOpen, setIsOpen] = useState(true);
  const [formSubmited, setFormSubmited] = useState(false);
  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: null,
    end: null,
  });

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";
    return formValues.title.trim().length > 0 ? "is-valid" : "is-invalid";
  }, [formValues.title, formSubmited]);

  useEffect(() => {
    if (activeElement !== null) {
      setFormValues({ ...activeElement });
    }
  }, [activeElement]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };
  const onCloseModal = () => {
    closeDateModal();
    setFormSubmited(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmited(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (difference <= 0 || isNaN(difference)) {
      Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
      return;
    }
    if (formValues.title.trim().length <= 0) {
      Swal.fire("Se requiere un título", "Ingresar titulo", "warning");
      return;
    }
    console.log(formValues);
    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmited(false);
    //TODO: Cerrar modal
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Example Modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2 d-flex justify-content-center flex-column">
          <label>Fecha y hora inicio</label>
          <hr />
          <DatePicker
            className="form-control ml-2"
            placeholderText="Fecha de inicio"
            onChange={(event) => onDateChange(event, "start")}
            selected={formValues.start}
            dateFormat={"Pp"}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2 d-flex justify-content-center flex-column">
          <label>Fecha y hora fin</label>
          <hr />
          <DatePicker
            className="form-control"
            placeholderText="Fecha de fin"
            onChange={(event) => onDateChange(event, "end")}
            selected={formValues.end}
            dateFormat={"Pp"}
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
