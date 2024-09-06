import { ReactNode } from 'react';
import { Context, ImpressionConfig } from '../types';

export default ($: Context): ReactNode => {
  const boxCss = {
    width: 200,
    border: `solid 3px ${$.font.color.secondary}`,
    borderRadius: 10,
    marginRight: 50,
    fontStyle: 'italic'
  }

  const debug = {
    // border: '3px solid red',
  }

  const config = $.config as ImpressionConfig

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontFamily: 'Arial',
        fontSize: $.font.size.primary,
        fontWeight: 'bold',
        color: $.font.color.primary,
        lineHeight: 2,
      }}
    >

      <p style={{ ...debug, width: config.size.start }}>
      </p>

      <p style={{ ...debug, width: config.size.end }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <p>
            <img
              style={{
                width: 200,
                height: 200,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              src={$.camera.logo}
            />
          </p>

          <p style={{ display: 'flex', width: 400, ...debug }}>
            <p style={{ ...boxCss }}>
              <p style={{ margin: '0 auto' }}>F</p>
            </p>
            <p>{$.exposure.aperture}</p>
          </p>

          <p style={{ display: 'flex', width: 400 }}>
            <p style={{ ...boxCss }}>
              <p style={{ margin: '0 auto' }}>ISO</p>
            </p>
            <p>{$.exposure.iso}</p>
          </p>

          <p style={{ display: 'flex', width: 400 }}>
            <p style={{ ...boxCss }}>
              <p style={{ margin: '0 auto' }}>S</p>
            </p>
            <p>{$.exposure.shutter}</p>
          </p>
        </div>
      </p>


    </div>
  );
}

