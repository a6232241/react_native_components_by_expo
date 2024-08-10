import Provider, { PropsType as ProviderPropsType } from './Provider';
import Content, { PropsType as ContentPropsType } from './Content';

type PropsType = ProviderPropsType & ContentPropsType;

const Container = ({
  children,
  headerHeight,
  stickyHeight,
  stickyVerticalOffset,
  backgroundZoomRatio,

  style,
  header,
  headerStyle,
  sticky,
  stickyStyle,
  stickyVerticalOffsetBgColor,
  background
}: PropsType) => {
  return (
    <Provider
      headerHeight={headerHeight}
      stickyHeight={stickyHeight}
      stickyVerticalOffset={stickyVerticalOffset}
      backgroundZoomRatio={backgroundZoomRatio}
    >
      <Content
        style={style}
        header={header}
        headerStyle={headerStyle}
        sticky={sticky}
        stickyStyle={stickyStyle}
        stickyVerticalOffsetBgColor={stickyVerticalOffsetBgColor}
        background={background}
      >
        {children}
      </Content>
    </Provider>
  );
};

export default Container;