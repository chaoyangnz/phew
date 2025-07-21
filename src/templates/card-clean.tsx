import type { ReactNode } from 'react';
import type { CardConfig, ManifestTemplateContext } from '../types';

export default ($: ManifestTemplateContext<CardConfig>): ReactNode => {
  const textCss = { fontSize: $.config.font.size.primary, color: $.config.font.color.primary, fontWeight: 'bold' };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 100,
        paddingRight: 100,
        fontFamily: 'Arial'
      }}
    >
      <p style={{}}>
        <img style={{ width: 180, height: 180, marginLeft: 'auto', marginRight: 'auto' }} src={$.exif.camera.logo} />
      </p>

      <p style={{ ...textCss, textAlign: 'center' }}>
        {$.exif.exposure.focal}mm 𝓕{$.exif.exposure.aperture} {$.exif.exposure.shutter}s ISO{$.exif.exposure.iso}
      </p>
    </div>
  );
};
