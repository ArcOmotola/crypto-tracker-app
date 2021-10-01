import React, { useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

export default function Cryptocurrencies({ simplified }) {
    const count = simplified ? 10 : 100;                                     //fetches only 10 cards in home page
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);     //and 100 in the cryptocurrencies page
    const [cryptos, setCryptos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) =>        //implementing search term, by default all cryptoList is included upon componenet did mount, until component did update (cryptoList or searchTerm change)
        coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );
        
        setCryptos(filteredData);

    }, [cryptosList, searchTerm]);
    
    if(isFetching) return <Loader />;
    // console.log(cryptosList);

    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)}/>
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
                        <Link to={`/crypto/${currency.id}`}>
                            <Card 
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} alt=""/>} 
                                hoverable
                            >
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market: {millify(currency.marketCap)}</p>
                                <p>Price: {millify(currency.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}
