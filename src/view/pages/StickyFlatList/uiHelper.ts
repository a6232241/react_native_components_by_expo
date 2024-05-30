export const headerHeight = 200;
export const stickyHeight = 50;
export const stickyBgColor = 'blue';

export const getUrlType = (url: string): 'video' | 'image' => {
  const types: Map<string, 'video' | 'image'> = new Map([
    ['png', 'image'], ['jpg', 'image'], ['jpeg', 'image'], ['gif', 'image'],
    ['mp4', 'video'], ['mov', 'video'], ['avi', 'video']
  ]);
  const splitArrray = url.split('.');
  const extension = splitArrray[splitArrray.length - 1];
  return types.get(extension) ?? 'image';
};
