import { Table, Tbody, Tr, Td, TableContainer } from "@chakra-ui/react";
import { useState } from "react";

const TableGuests = ({ guests, handleEditClick }) => {
  return (
    <>
      <TableContainer width="100%" border="2px solid #7E7935">
        <Table >
          <Tbody>
            {guests.map((guest, index) => (
              <Tr key={index} bg={index % 2 === 0 ? "#fff" : "#D9E1A5"} borderBottom={index % 2 === 0 ? "#fff" : "#7E7935"} borderTop={index % 2 === 0 ? "#fff" : "#7E7935"} h="60px">
                <Td fontWeight="bold">{guest.name}</Td>
                <Td fontWeight="bold">{guest.quantity}</Td>
                <Td fontWeight="bold" color={guest.isConfirmed === 0 ? "#D88000" : "#584F4A"}>{guest.isConfirmed === 0 ? "Pendente" : "Confirmado"}</Td>
                <Td>
                  <button style={{ background: "#9A5B0D", borderRadius: "8px" }} onClick={() => handleEditClick(guest)}>Editar</button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableGuests;
