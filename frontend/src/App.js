import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled, {css, keyframes, injectGlobal} from 'styled-components'
import logo from './logo.svg';
injectGlobal`
  body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
`;
const logoSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`
const styles = `
  text-align: center;
  header{
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
    img{
      animation: ${logoSpin} infinite 20s linear;
      height: 80px;
    }
    h1{
      font-size: 1.5em;
    }
  }
  p{
    font-size: large;
  }`
  
const Div = styled.div`${props=>props.css}`
class App extends Component {
  render() {
    return (
      <Div css={css`${styles}`}>
        <header>
          <img src={logo} alt="logo" />
          <h1>Welcome to React</h1>
        </header>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/new" >To New </Link>
      </Div>
    );
  }
}

export default App;
