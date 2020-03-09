import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const Button = styled.a`
  display: block;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  margin: 2rem auto;
  background-color: ${props => (props.bgColor ? '#da552f' : 'white')};
  color: ${props => (props.bgColor ? 'white' : '#000000')};

  &:last-of-type {
    margin-right: 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

Button.propTypes = {
  bgColor: PropTypes.bool,
};

Button.defaultProps = {
  bgColor: false,
};

export default Button;
