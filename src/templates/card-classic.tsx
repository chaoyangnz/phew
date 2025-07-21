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
        // flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 100,
        paddingRight: 100,
        fontFamily: 'Arial'
      }}
    >
      <p style={{ flex: '1 0 0', ...textCss }}>
        <span>{$.exif.camera.model}</span>
      </p>

      <p style={{ flex: '1 0 0' }}>
        <img style={{ width: 180, height: 180, marginLeft: 'auto', marginRight: 'auto' }} src={$.exif.camera.logo} />
      </p>

      <p style={{ flex: '1 0 0', ...textCss }}>
        <span style={{ marginLeft: 'auto' }}>
          {$.exif.exposure.focal}mm 𝓕{$.exif.exposure.aperture} {$.exif.exposure.shutter}s ISO{$.exif.exposure.iso}
        </span>
      </p>
    </div>
  );
};
