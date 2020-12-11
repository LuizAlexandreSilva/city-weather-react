import React from 'react';
import { Col, Row } from 'react-bootstrap';

import Header from '../../components/Header';

const Home: React.FC = () => {
  return (
    <Header>
      <Row>
        <Col>
          <h5>WEATHER IN YOUR CITY</h5>
        </Col>
      </Row>
      <Row>
        <input type="text" className="form-control" />
      </Row>
    </Header>
  );
};

export default Home;
