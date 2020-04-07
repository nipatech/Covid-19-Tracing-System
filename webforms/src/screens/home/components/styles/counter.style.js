import styled from "styled-components";

const CounterWrapper = styled.section`
  max-width: 400px;
  margin: auto;

  button{
    width: 80px;
    height: 30px;
    border: none;
    text-transform: uppercase;
    margin: 0 5px;
    cursor: pointer;
    border-radius: 3px;

    &:hover{
      background: #dddddd;
    }
  }
`

export default CounterWrapper;