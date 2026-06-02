import { ReactNode, useEffect, useRef, MouseEvent } from "react";
import { createPortal } from "react-dom";
import './modal.css'
import Boton from "../../componente-estilo/boton/boton";
import useRetardo from "../../hooks/tiempo/useRetardo";
import Cerrar from '../../assets/cancel.svg?react'
import { useModalContext } from "../../contexto/contextoModal";

const eventListener = 'keydown'

interface PropsModal {
  children: ReactNode;
  chica?: boolean;
  nuevoEstilo?: string;
}

function Modal({ children, chica = undefined, nuevoEstilo = '' }: PropsModal) {
  const modalRef = useRef<HTMLDivElement>(null)
  const { modal, setModal } = useModalContext();
  const retardoModal = useRetardo(setModal, 100)

  const cerrarModal = () => {
    if (modalRef.current) {
      modalRef.current.classList.remove('modal-activo');
      modalRef.current.classList.add('modal-inactivo');
    }
    retardoModal(false);
  }

  const handleClickDentroModal = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const modalRoot = document.getElementById('modal');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cerrarModal()
      }
    }
    if (modal) {
      document.addEventListener(eventListener, handleEsc);
      if (modalRef.current) {
        modalRef.current.classList.add('modal-activo');
      }
    } else {
      if (modalRef.current) {
        modalRef.current.classList.remove('modal-activo');
        modalRef.current.classList.remove('modal-inactivo');
      }
    }

    return () => {
      document.removeEventListener(eventListener, handleEsc);
    }
  }, [modal, setModal])

  if (!modal || !modalRoot) {
    return null;
  }

  return createPortal(
    <div className={`modal-fondo ${modal ? 'modal-abierto' : ''}`} onClick={cerrarModal}>
      <div className={`modal-frente ${chica ? 'modal-chico' : ''} ${nuevoEstilo}`} ref={modalRef} onClick={handleClickDentroModal}>
        {children}
        <Boton onClick={cerrarModal} icono={<Cerrar />} cerrar nuevoEstilo="btn-icono-chico" />
      </div>
    </div>, modalRoot
  )
}

export default Modal;