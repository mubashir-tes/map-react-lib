import { Button, Modal } from "antd";
import React, { useState } from "react";
import svgFile from "../assets/view.svg";
const CreateModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal} className="create-btn">
        Open Modal with async logic
      </Button>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className="create-modal">
          <img src={svgFile} alt="" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum
          voluptates maiores magnam provident quasi saepe ut fugiat vel facere
          odit. Vero nobis at praesentium beatae nesciunt maxime odit architecto
          explicabo tempore inventore? Consequatur, laboriosam! Officia eum
          incidunt inventore obcaecati! Hic aut minus laboriosam, ipsa
          voluptatibus unde dolorum laudantium! Accusamus, modi?
        </div>
      </Modal>
    </>
  );
};

export default CreateModal;
