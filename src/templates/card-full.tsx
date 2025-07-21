import type { ReactNode } from 'react';
import type { CardConfig, ManifestTemplateContext } from '../types';

export default ($: ManifestTemplateContext<CardConfig>): ReactNode => {
  const primaryCss = { fontSize: $.config.font.size.primary, color: $.config.font.color.primary, fontWeight: 'bold' };
  const secondaryCss = { fontSize: $.config.font.size.secondary, color: $.config.font.color.secondary };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 100,
        paddingRight: 100,
        fontFamily: 'Arial'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <p style={{ ...primaryCss }}>{$.exif.len.model}</p>
        <p style={{ ...secondaryCss }}>{$.exif.camera.model}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <img style={{ width: 180, height: 180, marginRight: 30 }} src={$.exif.camera.logo} />
        <div style={{ height: 180, borderLeft: `solid 4px ${$.config.font.color.secondary}`, marginRight: 30 }}></div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <p style={{ ...primaryCss }}>
            {$.exif.exposure.focal}mm 𝓕{$.exif.exposure.aperture} {$.exif.exposure.shutter}s ISO{$.exif.exposure.iso}
          </p>
          <p style={{ ...secondaryCss }}>{$.exif.datetime}</p>
        </div>
      </div>
    </div>
  );
};
