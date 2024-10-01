import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styled from 'styled-components/native';

type ArrowProps = {
  iconName: string;
  onPress: () => void;
};

const ArrowButtonContainer = styled.TouchableOpacity`
  padding: 16px 22px 16px 22px;
`;

const ArrowButton = ({ iconName, onPress }: ArrowProps) => {
  const arrowSize = 16;
  const arrowColor = '#000';

  return (
    <ArrowButtonContainer onPress={onPress}>
      <SimpleLineIcons name={iconName} size={arrowSize} color={arrowColor} />
    </ArrowButtonContainer>
  );
};

export default ArrowButton;
