import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import MainWindow from "../components/MainWindow/MainWindow";
import Table from "../components/Table/Table";
import Mastering from "../components/Mastering/Mastering";
import TrainingPage from "../components/Training/TrainingPage";
import SignallingPage from "../components/Signalling/SignallingPage";

const App: FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<MainWindow />} />
          <Route path="/table" element={<Table />} />
          <Route path="/mastering" element={<Mastering />} />
          <Route path="/training" element={<TrainingPage/>}/>
          <Route path="/signalling" element={<SignallingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;