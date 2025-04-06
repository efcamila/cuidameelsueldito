import classNames from "classnames";
import "./Modal.css";
import { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({ size = "md", children }) => {
    const modalClassNames = classNames(
      "h-auto max-h-[30rem] flex flex-col bg-white rounded-2xl m-1 dark:bg-black-full",
      {
        "w-96": size === "sm",
        "w-[500px]": size === "md",
        "w-[720px]": size === "lg",
      }
    );
  
    return (
      <div className="min-w-screen min-h-screen bg-slate-950/50  fixed inset-0 z-[70] flex justify-center items-center  backdrop-blur-sm max-h-96">
        <div className={modalClassNames}>{children}</div>
      </div>
    );
  };
  
  const ModalHeader = ({ children, onClose }) => {
    return (
      <header className="w-full flex flex-col py-4 px-6 gap-4 ">
        <div className="flex justify-between">
          <div className="flex flex-col w-full mt-1">{children}</div>
          <div className="">
            <button
              onClick={onClose}
              className="hover:rounded-full hover:bg-gray-200 p-2 dark:hover:bg-black-900"
            >
              <IoCloseOutline className="text-gray-800 text-2xl hover:rounded-full dark:text-black-200" />
            </button>
          </div>
        </div>
      </header>
    );
  };
  
  const ModalTitle = ({ children }) => {
    return (
      <h2>{children}</h2>
    );
  };
  
  const ModalSubtitle = ({ children }) => {
    return (
      <h3>{children}</h3>
    );
  };
  
  const ModalContent = ({ children }) => {
    return (
      <section className="overflow-y-auto flex flex-col flex-1 py-2 px-6 gap-3 text-gray-950 dark:text-gray-200">
        {children}
      </section>
    );
  };
  
  const ModalFooter = ({ children }) => {
    return (
      <footer className="py-4 px-6 flex gap-3 justify-end ">{children}</footer>
    );
  };
  
  Modal.Header = ModalHeader;
  Modal.Title = ModalTitle;
  Modal.Subtitle = ModalSubtitle;
  Modal.Content = ModalContent;
  Modal.Footer = ModalFooter;
  
  export default Modal;