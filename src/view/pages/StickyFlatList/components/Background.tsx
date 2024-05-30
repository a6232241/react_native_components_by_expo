import React, { useCallback } from 'react';
import { Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { getUrlType, headerHeight } from '../uiHelper';
import Video from 'react-native-video';
// import LinearGradient from 'react-native-linear-gradient';

const Background = ({ source, contentHeight }: { source?: string | null; contentHeight?: number; }) => {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const { imageStyle } = StyleSheet.create({ imageStyle: { width: windowWidth, height: headerHeight } });

  const showVideo = useCallback((_source: string) => (
    <Video
      style={{ width: '100%', height: '100%' }}
      resizeMode='cover'
      source={{ uri: _source }}
      muted repeat paused={false}
    />
  ), []);

  const showImage = useCallback((_source: string) => (
    <Image
      style={{ width: '100%', height: '100%' }}
      resizeMode='cover'
      source={{ uri: _source }}
    />
  ), []);

  return (<>
    <View style={[imageStyle, { position: 'absolute', ...(contentHeight && { height: contentHeight }) }]} pointerEvents='none'>
      {source ? getUrlType(source) === 'video' ? showVideo(source) : showImage(source) : null}
    </View>
    <View style={{ position: 'absolute', width: windowWidth, height: windowHeight }} pointerEvents='none'>
      {/* <LinearGradient
        colors={[
          'rgba(26,26,26,0)',
          'rgba(26,26,26,0.3)',
          'rgba(26,26,26,0.6)',
          'rgba(26,26,26,0.9)',
          'rgba(26,26,26,1)']}
        style={{ ...imageStyle, ...(contentHeight && { height: contentHeight }) }} /> */}
    </View>
  </>);
};

export default Background;