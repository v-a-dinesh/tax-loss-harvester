import React from "react";
import Layout from "./components/layout/Layout";
import PreHarvestingCard from "./components/cards/PreHarvestingCard";
import AfterHarvestingCard from "./components/cards/AfterHarvestingCard";
import HoldingsTable from "./components/holdings/HoldingsTable";
import { HarvestingProvider } from "./context/HarvestingProvider";

const App: React.FC = () => {
  return (
    <HarvestingProvider>
      <Layout>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PreHarvestingCard />
          <AfterHarvestingCard />
        </div>
        <HoldingsTable />
      </Layout>
    </HarvestingProvider>
  );
};

export default App;
