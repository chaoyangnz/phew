import type { ReactNode } from 'react'
import type { CardConfig, Context } from '../types'

export default ($: Context<CardConfig>): ReactNode => {

  const textCss = {fontSize: $.font.size.primary, color: $.font.color.primary, fontWeight: 'bold'}

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
        fontFamily: 'Arial',
      }}
    >

      <p style={{  }}>
        <img
          style={{ width: 180, height: 180, marginLeft: 'auto', marginRight: 'auto' }}
          src={$.camera.logo}
        />
      </p>

      <p style={{ ...textCss, textAlign: 'center' }}>
        {$.exposure.focal}mm 𝓕{$.exposure.aperture} {$.exposure.shutter}s ISO{$.exposure.iso}
      </p>

    </div>
  );
}

