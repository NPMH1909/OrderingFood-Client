import React, { useState } from "react";
import { Button, Select, Col, Row, Table, Checkbox } from "antd";
import { RightCircleOutlined, ReloadOutlined } from "@ant-design/icons";
import { PageTitle } from "./styles/PageTitle.styles";
import { StyledFormItem, StyledLabel } from "./styles/FormItem.styles";
import ItemsInfoRow from "./ItemsInfoRow";

// Mock Database
const orders = [
  { id: "1001", status: "New", customer: "John Doe", items: [{ material: "Banner", pieces: 1, size: 2 }], createdAt: "2024-11-01" },
  { id: "1002", status: "To be shipped", customer: "Jane Smith", items: [{ material: "Poster", pieces: 2, size: 1 }], createdAt: "2024-11-04" },
  { id: "1003", status: "To be shipped", customer: "Jane Smith", items: [{ material: "Poster", pieces: 2, size: 1 }], createdAt: "2024-11-04" },
  { id: "1004", status: "To be shipped", customer: "Jane Smith", items: [{ material: "Poster", pieces: 2, size: 1 }], createdAt: "2024-11-04" },
  { id: "1005", status: "To be shipped", customer: "Jane Smith", items: [{ material: "Poster", pieces: 2, size: 1 }], createdAt: "2024-11-04" },

  { id: "1006", status: "To be shipped", customer: "Jane Smith", items: [{ material: "Poster", pieces: 2, size: 1 }], createdAt: "2024-11-04" },
  { id: "1007", status: "To be shipped", customer: "Jane Smith", items: [{ material: "Poster", pieces: 2, size: 1 }], createdAt: "2024-11-04" },

];

//Status
const statuses = ["New", "Waiting for calculation", "To be shipped"];

const OrderList = () => {
  const [filterStatus, setFilterStatus] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const filteredOrders = filterStatus ? orders.filter(order => order.status === filterStatus) : orders;

  // Handle checkbox for individual orders
  const onSelectOrder = (orderId) => {
    setSelectedOrders((prevSelected) =>
      prevSelected.includes(orderId)
        ? prevSelected.filter((id) => id !== orderId)
        : [...prevSelected, orderId]
    );
  };

  // Handle checkbox for selecting all orders
  const onSelectAllOrders = (e) => {
    if (e.target.checked) {
      setSelectedOrders(filteredOrders.map((order) => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  // Handle updating (reloading) orders data
  const handleUpdate = () => {
    // Logic for reloading data, e.g., fetching from an API
    console.log("Data updated!");
  };

  const columns = [
    {
      title: <Checkbox onChange={onSelectAllOrders} checked={selectedOrders.length === filteredOrders.length} />,
      dataIndex: "select",
      render: (_, record) => (
        <Checkbox
          checked={selectedOrders.includes(record.id)}
          onChange={() => onSelectOrder(record.id)}
        />
      ),
      width: 50,
    },
    { title: "Id", dataIndex: "id", render: text => <a>{text}</a> },
    { title: "Status", dataIndex: "status" },
    { title: "Customer", dataIndex: "customer" },
    {
      title: "Items info",
      render: (_, record) => (
        <ItemsInfoRow
          items={record.items}
          totalSize={record.items.reduce((acc, item) => acc + item.size, 0)}
        />
      ),
    },
    { title: "Created at", dataIndex: "createdAt" },
    //{ render: () => <Button icon={<RightCircleOutlined />} type="link" /> },  
  ];

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col md={18}>
          <PageTitle>Order Lists</PageTitle>
        </Col>
        <Col xs={24} md={6}>
          <Row gutter={8} align="middle">
            <Col flex="auto">
              <StyledFormItem style={{ marginTop: 10, marginRight: 10 }}>
                <StyledLabel>Filter by status</StyledLabel>
                <Select style={{ width: "100%" }} value={filterStatus} onChange={setFilterStatus}>
                  <Select.Option value="">Without status filter</Select.Option>
                  {statuses.map((status) => (
                    <Select.Option key={status} value={status}>
                      {status}
                    </Select.Option>
                  ))}
                </Select>
              </StyledFormItem>
            </Col>
          </Row>
        </Col>
        <Col>
              <Button icon={<ReloadOutlined />} onClick={handleUpdate}>
                Update
              </Button>
            </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </>
  );
};

export default OrderList;
