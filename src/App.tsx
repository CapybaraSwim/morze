import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import MainWindow from "../components/MainWindow/MainWindow";
import Table from "../components/Table/Table";

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainWindow />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;