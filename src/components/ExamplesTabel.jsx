import React, { Component } from "react";
import config from "../examples";
import { Route, Link } from "react-router-dom";
import { Table } from "antd";

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
        {config.map(c => 
          <Route key={c.name} path={`/examples/${c.name}`} component={c.component}/>
        )}
      </div>
    );
  }
}

export default ExamplesTabel;
