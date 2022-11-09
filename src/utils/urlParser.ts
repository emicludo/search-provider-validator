class UrlParser {
  static addPrefix(url: string): string {
    const hasHttp = url.slice(0, 5) == 'http:';
    const hasHttps = url.slice(0, 5) == 'https';
    if (hasHttp || hasHttps) {
      return url;
    } else {
      return 'https://' + url
    }
  }
}

export default UrlParser;

