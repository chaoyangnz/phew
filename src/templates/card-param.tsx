import type { ReactNode } from 'react';
import type { CardConfig, TemplateContext } from '../types';

export default ($: TemplateContext<CardConfig>): ReactNode => {
  const textCss = { fontSize: $.font.size.primary, color: $.font.color.primary, fontWeight: 'bold' };

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 100,
        paddingRight: 100,
        fontFamily: 'Arial'
      }}
    >
      <p style={{ ...textCss }}>
        {$.exposure.focal}mm 𝓕{$.exposure.aperture} {$.exposure.shutter}s ISO{$.exposure.iso}
      </p>
    </div>
  );
};
