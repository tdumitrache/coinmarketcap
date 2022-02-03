import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {

  const { data: cryptosList, isFetching } = useGetCryptosQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    setCryptos(cryptosList?.data?.coins);

    const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    setCryptos(filteredData);
  }, [cryptosList, searchTerm])


  return <>
    {
      !simplified
      && (<div className='search-crypto'>
        <Input placeholder='Search Cryptocurrency' onChange={e => setSearchTerm(e.target.value)} />
      </div>)

    }

    <Row gutter={[32, 32]} className='crypto-card-container'>
      {
        cryptos.filter((_, idx) => simplified ? (idx < 10) : true).map((crypto) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={crypto.uuid}>
            <Link to={`/crypto/${crypto.uuid}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={<img className='crypto-image' src={crypto.iconUrl} />}
                hoverable
              >
                <p className='font-weight-bold'>Price: <span className='font-weight-normal'>{millify(crypto.price)}</span></p>
                <p className='font-weight-bold'>Market Cap: <span className='font-weight-normal'>{millify(crypto.marketCap)}</span></p>
                <p className='font-weight-bold'>Daily Change: <span className={`${crypto.change < 0 ? "color-red" : "color-green"} font-weight-normal`}>{`${millify(crypto.change)}%`}</span></p>
              </Card>
            </Link>
          </Col>
        ))
      }
    </Row>;
  </>

};

export default Cryptocurrencies;