import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

type ColumnProps = {
  color: string;
  opacity: number;
  text: string | number;
  disabled: boolean;
  onPress?: () => void;
  isSelected: boolean;
};

const ColumnContainer = styled.TouchableOpacity<{
  columnSize: number;
  isSelected: boolean;
}>`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${(props) => `${props.columnSize}px`};
  height: ${(props) => `${props.columnSize}px`};
  background-color: ${(props) => (props.isSelected ? 'grey' : 'transparent')};
  border-radius: ${(props) => `${props.columnSize}px`};
`;

const ColumnText = styled.Text<{
  isSelected: boolean;
  opacity: number;
  color: string;
}>`
  color: ${(props) => (props.isSelected ? 'white' : props.color)};
  opacity: ${(props) => props.opacity};
`;

const Column = ({
  color,
  opacity,
  text,
  disabled,
  onPress,
  isSelected,
}: ColumnProps) => {
  const columnSize = 40;

  return (
    <ColumnContainer {...{ disabled, onPress, isSelected, columnSize }}>
      <ColumnText {...{ isSelected, color, opacity }}>{text}</ColumnText>
    </ColumnContainer>
  );
};

export default Column;
