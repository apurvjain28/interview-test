import styled from 'styled-components';

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 5rem;
`;


export const Filters = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem 0;
  column-gap: 1rem;
  > input {
    max-width: 10rem;
  }
  > select {
    border: 0
  }
`;


export const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
  column-gap: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
`;


export const Table = styled.table`
  width: calc(100% - 10rem);
  padding: 0;
  margin: 1rem 0;
  max-width: 100%;
  background: #fff;
  border-radius: 5px;
  border-collapse: collapse;
  border-spacing: 0;
  box-shadow: 0px 1px 5px 2px #d3d1d1;
  overflow: hidden;
`;

export const Thead = styled.thead`
  background: lightgrey;
`;


export const TH = styled.th`
  padding: 0.5rem;
  text-align: center;
`;


export const Cell = styled.td`
  padding: 0.5rem;
  text-align: center;
`;

export const FormInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  column-gap: 1rem;
  row-gap: 1rem;
  > input {
    max-width: 20rem;
  }
`
export const Action = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem 0;
  column-gap: 1rem;
`;
