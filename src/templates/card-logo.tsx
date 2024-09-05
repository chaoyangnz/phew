import { ReactNode } from 'react';

export default ($: any): ReactNode => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 100,
        paddingRight: 100,
        fontFamily: 'Arial',
      }}
    >

      <p style={{ flex: '1 0 0' }}>
        <img
          style={{ width: 180, height: 180, marginLeft: 'auto', marginRight: 'auto' }}
          src={$.camera.logo}
        />
      </p>

    </div>
  );
};

