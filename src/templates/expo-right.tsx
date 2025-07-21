import type { ReactNode } from 'react';
import type { ManifestTemplateContext, ExpoConfig } from '../types';
import { styles } from './styles.ts';

export default ($: ManifestTemplateContext<ExpoConfig>): ReactNode => {
  // text box: F, ISO, S
  const box = (letters: string) => (
    <p
      style={{
        width: 180,
        border: `solid 3px ${$.config.font.color.secondary}`,
        borderRadius: 10,
        marginRight: 50,
        fontStyle: 'italic'
      }}
    >
      <p style={{ margin: '0 auto' }}>{letters}</p>
    </p>
  );

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Arial',
        fontSize: $.config.font.size.primary,
        fontWeight: 'bold',
        color: $.config.font.color.primary,
        lineHeight: 2
      }}
    >
      <p style={{ ...styles.debug, width: $.config.size.start }}></p>

      {/*<div*/}
      {/*  style={{*/}
      {/*    ...styles.debug,*/}
      {/*    width: $.photo.width,*/}
      {/*    height: $.photo.height,*/}
      {/*    boxShadow:*/}
      {/*      '-16px 0 40px 0 rgba(0, 0, 0, 0.3), 16px 0 40px 0 rgba(0, 0, 0, 0.3), 0 -16px 40px 0 rgba(0, 0, 0, 0.3), 0 16px 40px 0 rgba(0, 0, 0, 0.3)'*/}
      {/*  }}*/}
      {/*></div>*/}

      <p style={{ ...styles.debug, width: $.config.size.end }}>
        <p
          style={{
            ...styles.debug,
            ...styles.center,
            // flex container
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          <img
            style={{
              ...styles.debug,
              width: 300,
              height: 300
              // ...styles.center
            }}
            src={$.exif.camera.logo}
          />

          <p style={{ display: 'flex', ...styles.debug }}>
            {box('F')}
            <p>{$.exif.exposure.aperture}</p>
          </p>

          <p style={{ display: 'flex', ...styles.debug }}>
            {box('ISO')}
            <p>{$.exif.exposure.iso}</p>
          </p>

          <p style={{ display: 'flex', ...styles.debug }}>
            {box('S')}
            <p>{$.exif.exposure.shutter}</p>
          </p>
        </p>
      </p>
    </div>
  );
};
