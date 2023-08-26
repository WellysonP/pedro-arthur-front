import { Table, Tbody, Tr, Td, Th, TableContainer, Thead } from "@chakra-ui/react";
import { useState } from "react";

const TableGuests = ({ guests, handleEditClick }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...guests].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });
  return (
    <>
      <TableContainer width="100%" border="2px solid #7E7935">
        <Table size="sm">
          <Thead>
            <Tr style={{ height: "30px" }}>
              <Th onClick={() => requestSort('name')}>Nome</Th>
              <Th onClick={() => requestSort('quantity')}>Qtd.</Th>
              <Th onClick={() => requestSort('isConfirmed')} >CONF.</Th>
              <Th onClick={() => requestSort('suggestion')} >SUG.</Th>
              <Th>Editar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sortedData.map((item, index) => (
              <Tr key={item.id} bg={index % 2 === 0 ? "#fff" : "#D9E1A5"} borderBottom={index % 2 === 0 ? "#fff" : "#7E7935"} borderTop={index % 2 === 0 ? "#fff" : "#7E7935"}>
                <Td fontWeight="bold">{item.name}</Td>
                <Td fontWeight="bold">{item.quantity}</Td>
                <Td fontWeight="bold" color={item.isConfirmed === 0 ? "#D88000" : "#584F4A"}>{item.isConfirmed === 0 ? "Pendente" : "Confirmado"}</Td>
                <Td fontWeight="bold">{item.suggestion}</Td>
                <Td style={{ padding: "4px" }}>
                  <button style={{ background: "#9A5B0D", borderRadius: "8px", height: "30px", fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center" }} onClick={() => handleEditClick(item)}>Editar</button>
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
