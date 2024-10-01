import styled from 'styled-components/native';

type MarginProps = {
  height: number;
};

const Margin = styled.View<MarginProps>`
  height: ${(props) => `${props.height}px`};
`;

export default Margin;
