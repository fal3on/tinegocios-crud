import styled from 'styled-components'
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background: #f5f5f5;
  color: black;
`
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1024px;
  padding: 20px;
`
export const DashboardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`
export const ModalRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
`
export const Form = styled.form`
  display: flex;
  /* flex-direction: column; */
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 400px;
  flex-wrap: wrap;
  column-gap: 1rem;
  padding: 15px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    max-width: 600px;
  }
`
export const Label = styled.label`
  width: 100%;
  text-align: left;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`
export const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  color: black;
`
export const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  background-color: white;
  color: black;
`
export const Option = styled.option`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`
export const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 0;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: #333;
  cursor: pointer;
`
export const Card = styled.div`
  border: 2px solid;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  /* display: ${({ active }) => (active ? 'flex' : 'none')}; */
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  width: 100%;
  img {
    width: 32px;
    height: 32px;
    object-fit: cover;
  }
  .cardHeader {
    width: 50%;
    margin-left: 1rem;
    h3 {
      font-size: 14px;
      font-weight: normal;
      span {
        font-weight: bolder;
      }
    }
  }
  .cardBody {
    width: 100%;
    display: flex;
    gap: 1rem;
    span {
      font-size: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-left: 1rem;
      text-transform: lowercase;
      font-weight: bold;
      color: #333;
    }
  }
  .cardBody ul {
    list-style: none;
    padding: 0;
    margin: 0 auto;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 0;
      border-bottom: 1px solid #ddd;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
  .cardFooter {
    width: 100%;
    .card__actions {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
    }
    .btn {
      width: 80px;
      font-size: 14px;
    }
    .btn--primary {
      background: orange;
    }
    .btn--danger {
      background: #f00;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    .cardHeader {
      width: 100%;
      margin-left: 0;
      h3 {
        font-size: 16px;
        text-align: center;
      }
    }
    .cardBody {
      width: 100%;
      flex-direction: column;
      gap: 0.5rem;
      span {
        margin-left: 0;
      }
    }
    .cardFooter {
      width: 100%;
      .card__actions {
        flex-direction: column;
        gap: 0.5rem;
      }
      .btn {
        width: 100%;
        margin-bottom: 0;
      }
    }
  }
`
