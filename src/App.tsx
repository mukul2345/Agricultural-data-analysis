import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import Crops  from "./Component/Crops";

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Crops />
    </MantineProvider>
  );
}
