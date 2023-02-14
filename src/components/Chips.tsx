import { Chip, Stack } from "@mui/material";

export default function Chips({ data }: { data: string[] }) {
  return (
    <Stack direction="row" spacing={1} flexWrap="wrap" gap="10px">
      {data.map((item, index) => (
        <Chip key={`chip-${index}`} label={item} color="primary" />
      ))}
    </Stack>
  );
}
