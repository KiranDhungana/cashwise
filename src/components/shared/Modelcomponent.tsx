"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import React, { ReactElement, cloneElement } from "react";

type ModalcomponentProps = {
  label: string;
  title: string;

  childern: ReactElement<{ onClose?: () => void }>;
};

export default function Modalcomponent({ label, title, childern }: ModalcomponentProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Button variant="default" onClick={open}>
        {label}
      </Button>

      <Modal opened={opened} onClose={close} title={title} centered>
        {cloneElement(childern, { onClose: close })}
      </Modal>
    </>
  );
}
