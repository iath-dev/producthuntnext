import styled from '@emotion/styled';

const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  input,
  textarea {
    flex: 1;
    padding: 1rem;
  }

  textarea {
    height: 350px;
  }
`;

export default Field;
