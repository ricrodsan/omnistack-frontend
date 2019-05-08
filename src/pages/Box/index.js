import React, { Component } from "react";
import { Link } from "react-router-dom";

import DropZone from "react-dropzone";
import socket from "socket.io-client";

import api from "../../services/api";
import { MdAccountBox } from "react-icons/md";
import { distanceInWords } from "date-fns";
import es from 'date-fns/locale/es';

import "./styles.css";

export default class Box extends Component {
  state = {
    box: {}
  };

  async componentDidMount() {
    this.subscriberToNewFile();
    await this.load();

    console.log(this.state.box);
  }

  subscriberToNewFile = () => {
    const boxId = this.props.match.params.id;
    const io = socket("https://backendo.herokuapp.com");

    io.emit("connectRoom", boxId);
    io.on("file", data => {
      this.setState({
        box: { ...this.state.box, files: [data, ...this.state.box.files] }
      });
    });
    // io.connect("https://backendo.herokuapp.com", () => {});
  };

  async load() {
    const boxId = this.props.match.params.id;
    const response = await api.get(`/boxes/${boxId}`);
    this.setState({ box: response.data });
  }

  handlerUpload = files => {
    files.forEach(file => {
      const boxId = this.props.match.params.id;
      const data = new FormData();
      data.append("file", file);
      api.post(`boxes/${boxId}/files`, data);
    });
  };

  render() {
    return (
      <div id="box-container">
        <div id="box-container">
          <header>
            <h1>Page box</h1>
            <MdAccountBox />
          </header>

          <DropZone onDropAccepted={this.handlerUpload}>
            {({ getRootProps, getInputProps }) => (
              <div className="upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Arraste arquivos ou clique aqui</p>
              </div>
            )}
          </DropZone>

          <ul>
            {this.state.box.files &&
              this.state.box.files.map(file => (
                <li key={file._id}>
                  <a className="fileInfo" href={file.url} target="_blank">
                    {file.title}
                  </a>
                  <span>
                      A{" "} {distanceInWords(file.createdAt, new Date(),{
                          locale:es
                      })}
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <Link to="/"> Voltar </Link>
      </div>
    );
  }
}
