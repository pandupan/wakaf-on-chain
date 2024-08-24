import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';

interface IProps {
  text: string;
}

const QRCodeComponent = ({ text }: IProps) => {
  const [size, setSize] = useState(50);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSize(50);
      } else {
        setSize(75);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <QRCode value={text} size={size} />
  );
};

export default QRCodeComponent;
