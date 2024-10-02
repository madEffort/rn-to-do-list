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
  hasTodo?: boolean;
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
  hasTodo: boolean;
}>`
  color: ${(props) => (props.isSelected ? 'white' : props.color)};
  opacity: ${(props) => props.opacity};
  font-weight: ${(props) => (props.hasTodo ? '700' : 'normal')};
`;

const Column = ({
  color,
  opacity,
  text,
  disabled,
  onPress,
  isSelected,
  hasTodo,
}: ColumnProps) => {
  const columnSize = 40;

  return (
    <ColumnContainer
      disabled={disabled}
      onPress={onPress}
      isSelected={isSelected}
      columnSize={columnSize}>
      <ColumnText {...{ isSelected, color, opacity, hasTodo: !!hasTodo }}>
        {text}
      </ColumnText>
    </ColumnContainer>
  );
};

export default Column;
