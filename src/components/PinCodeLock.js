import React from 'react';
import PINCode from '@haskkor/react-native-pincode';

const PinCodeLock = ({ status, finishProcess}) => {
  return (
    <PINCode
      status={status}
      touchIDDisabled={true}
      finishProcess={finishProcess}
    />
  );
};

export default PinCodeLock;
