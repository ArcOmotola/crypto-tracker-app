import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Layout, Typography, Space} from "antd";

import { Navbar, Exchanges, Homepage, Cryptocurrencies, News, CryptoDetails } from './components';                //best practice for importing components
import "./App.css";

export default function App() {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <switch>
                            <Route exact path="/">
                                <Homepage />
                            </Route>
                            <Route exact path="/exchanges">
                                <Exchanges />
                            </Route>
                            <Route exact path="/cryptocurrencies">
                                <Cryptocurrencies />
                            </Route>
                            <Route exact path="/crypto/:coinId">
                                <CryptoDetails />
                            </Route>
                            <Route exact path="/news">
                                <News />
                            </Route>
                        </switch>
                    </div>
                </Layout>
            
            <div className="footer" >
                <Typography.Title level={5} style={{ color: "white", textAlign: "center"}}>
                    Cryptoverse <br/>
                    All rights reserved
                </Typography.Title>
                <Space>
                    <Link to="/">Home</Link>
                    <Link to="/exchanges">Exchanges</Link>
                    <Link to="/news">News</Link>
                </Space>
            </div>
        </div>    
        </div>
    )
}
