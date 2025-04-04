
export const getDjangoApiHost = () => {
    const djangoApiHostProtocol = process.env.NEXT_PUBLIC_DJANGO_API_HOST_PROTOCOL;
    const djangoApiHostName = process.env.NEXT_PUBLIC_DJANGO_API_HOST_NAME;
  
    return `${djangoApiHostProtocol}://${djangoApiHostName}`;
  };
  