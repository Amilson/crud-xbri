export const generateRandomString = (len: number, charSet?: string) => {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const randomString: string = new Array(len)
    .fill('1')
    .map(() => {
      return charSet?.charAt(Math.floor(Math.random() * charSet?.length));
    })
    .join('');
  return randomString;
};
