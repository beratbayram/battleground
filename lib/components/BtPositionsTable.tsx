import DeleteIcon from "@mui/icons-material/Delete";
import { FormControl } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export function BtPositionsTable({
  positions,
  setPositions,
}: {
  positions: [number, number][];
  setPositions: React.Dispatch<React.SetStateAction<[number, number][]>>;
}) {
  function handleDelete(index: number) {
    setPositions((currPositions) =>
      currPositions.filter((_, i) => i !== index)
    );
  }

  if(positions.length === 0) {
    return (
      <FormControl fullWidth margin="normal">
        <Paper>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Koordinat yok, lütfen haritadan ekleyin.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </FormControl>
    );
  }

  return (
    <FormControl fullWidth margin="normal">
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Enlem</TableCell>
              <TableCell>Boylam</TableCell>
              <TableCell>İşlemler</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((position, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{position[0].toFixed(6)}</TableCell>
                <TableCell>{position[1].toFixed(6)}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FormControl>
  );
}
