import Layout from "antd/lib/layout";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import CurrentForecast from "./components/CurrentForecast";
import "./stylesheets/app.scss";

function App() {
  return (
    <div className="App">
      <Layout>
        <Layout.Content>
          <Row>
            <Col span={24}>
              <h1 className="title center primary">
                3 Days Weather Forecast
              </h1>
            </Col>
            <Col span={24}>
              <CurrentForecast />
            </Col>
          </Row>
        </Layout.Content>
      </Layout>
    </div>
  );
}

export default App;
