import { ReactNode } from 'react';
import { Context } from '../types';

export default ($: Context): ReactNode => {
  const textCss = {fontSize: $.font.size.primary, color: $.font.color.primary, fontWeight: 'bold'}

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
      <p style={{ flex: '1 0 0', ...textCss }}>
        <span>
          {$.camera.model}
        </span>
      </p>

      <p style={{ flex: '1 0 0' }}>
        <img
          style={{ width: 180, height: 180, marginLeft: 'auto', marginRight: 'auto' }}
          src={$.camera.logo}
        />
      </p>

      <p style={{ flex: '1 0 0', ...textCss }}>
        <span style={{ marginLeft: 'auto' }}>
          {$.exposure.focal}mm 𝓕{$.exposure.aperture} {$.exposure.shutter}s ISO{$.exposure.iso}
        </span>
      </p>
    </div>
  );
}

