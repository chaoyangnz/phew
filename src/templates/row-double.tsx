import { ReactNode } from 'react';
import { Context } from '../types';

export default ($: Context): ReactNode => {
  const primaryCss = {fontSize: $.font.size.primary, color: $.font.color.primary, fontWeight: 'bold'}
  const secondarayCss = {fontSize: $.font.size.secondary, color: $.font.color.secondary};

  return <div style={{
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 100,
    paddingRight: 100,
    fontFamily: 'Arial',
  }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <p style={{ ...primaryCss }}>
        {$.len.model}
      </p>
      <p style={{ ...secondarayCss  }}>
        {$.camera.model}
      </p>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <img style={{ width: 180, height: 180, marginRight: 30 }} src={$.camera.logo} />
      <div style={{ height: 180, borderLeft: 'solid 4px #333', marginRight: 30 }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <p style={{ ...primaryCss }}>
          {$.exposure.focal}mm 𝓕{$.exposure.aperture} {$.exposure.shutter}s ISO{$.exposure.iso}
        </p>
        <p style={{ ...secondarayCss }}>
          {$.datetime}
        </p>
      </div>
    </div>
  </div>;
}
