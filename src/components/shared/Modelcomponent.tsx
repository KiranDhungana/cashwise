import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { ReactElement } from "react";
import { title } from "process";
type ModalcomponentProps = {
  label?: String;
  childern: ReactElement;
  title: String;
};
const Modalcomponent = ({ label, childern, title }: ModalcomponentProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title}>
        {childern}
      </Modal>
      <Button variant="default" onClick={open}>
        {label}
      </Button>
    </>
  );
};

export default Modalcomponent;
