import { ReactNode } from 'react';

export default ($: any): ReactNode => {
  const primaryCss = {fontSize: 50, color: $.font.color, fontWeight: 'bold'}
  const secondarayCss = {fontSize: 40, color: '#444444'};

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
      <div style={{ height: 180, borderLeft: 'solid 2px #333', marginRight: 30 }}></div>
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


