import React, { Component } from 'react';

import api from '../../services/api'

import './styles.css';
import logo from '../../assets/logo.svg';
import BoxList from '../Box/boxList';


export default class Main extends Component {

    state = {
        newBox: "",
        Boxes: ''
    };

    async componentDidMount() {
        const response = await api.get('/boxes');
        console.log(response.data);

        this.setState({Boxes: response.data});
    }

    handleSubmit = async e => {

        e.preventDefault();

        const response = await api.post('boxes', {
            title: this.state.newBox,
        });

        this.props.history.push(`box/${response.data._id}`);
    }

    handleInputChange = (e) => {
        this.setState({ newBox: e.target.value });
    }
    render() {
        return (
            <div id="Main">
            <div id="main-container">
                <form onSubmit={this.handleSubmit}>
                    <img src={logo} alt="" />
                    <input placeholder="Criar um box" onChange={this.handleInputChange} value={this.state.newBox} />
                    <button type="submit">Criar</button>
                </form>
                </div>
                <div id="box-list">
                    <BoxList Boxes={this.state.Boxes} />
                </div>
            </div>
        )
    };
}

