import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import _config from "../examples/index.json";
import { values } from 'lodash';
import ExamplesRoutes from './ExampleRoutes';

const config = values(_config);
const columns = [
  {
    title: "Component",
    dataIndex: "name",
    render: name => <Link to={`/examples/${name}`}>{name}</Link>
  },
  {
    title: "Description",
    dataIndex: "desc"
  }
];

class ExamplesTabel extends Component {
  render() {
    return (
      <div>
        <h1>Examples</h1>
        <Table
          columns={columns}
          dataSource={config}
          rowKey={({ name }) => name}
        />
        <ExamplesRoutes/>
      </div>
    );
  }
}

export default ExamplesTabel;
