import { urlValidation, iframeValidation } from '../../utils/validations';

describe('Validation utilities', () => {
  describe('urlValidation', () => {
    it('should validate correct HTTP URLs', () => {
      expect(urlValidation('http://www.example.com')).toBe(true);
      expect(urlValidation('http://example.com')).toBe(true);
      expect(urlValidation('http://example.com/path')).toBe(true);
      expect(urlValidation('http://example.com/path?query=123')).toBe(true);
    });

    it('should validate correct HTTPS URLs', () => {
      expect(urlValidation('https://www.example.com')).toBe(true);
      expect(urlValidation('https://example.com')).toBe(true);
      expect(urlValidation('https://example.com/path')).toBe(true);
      expect(urlValidation('https://subdomain.example.com')).toBe(true);
    });

    it('should validate URLs with various TLDs', () => {
      expect(urlValidation('https://example.io')).toBe(true);
      expect(urlValidation('https://example.dev')).toBe(true);
      expect(urlValidation('https://example.co.uk')).toBe(true);
    });

    it('should validate URLs with query parameters and hashes', () => {
      expect(urlValidation('https://example.com?param=value')).toBe(true);
      expect(urlValidation('https://example.com#section')).toBe(true);
      expect(urlValidation('https://example.com/path?a=1&b=2#hash')).toBe(true);
    });

    it('should validate URLs with ports', () => {
      expect(urlValidation('https://example.com:8080')).toBe(true);
      expect(urlValidation('http://localhost:3000')).toBe(true);
    });

    it('should invalidate malformed URLs', () => {
      expect(urlValidation('example.com')).toBe(false);
      expect(urlValidation('www.example.com')).toBe(false);
      expect(urlValidation('ftp://example.com')).toBe(false);
      expect(urlValidation('not a url')).toBe(false);
      expect(urlValidation('')).toBe(false);
      expect(urlValidation('http://')).toBe(false);
    });

    it('should handle special characters in URLs', () => {
      expect(urlValidation('https://example.com/path_with-chars')).toBe(true);
      expect(urlValidation('https://example.com/path~tilde')).toBe(true);
      expect(urlValidation('https://example.com/@username')).toBe(true);
    });
  });

  describe('iframeValidation', () => {
    it('should validate self-closing iframe tags', () => {
      expect(iframeValidation('<iframe src="https://example.com" />')).toBe(true);
      expect(iframeValidation('<iframe src="test.html"/>')).toBe(true);
    });

    it('should validate iframe tags with closing tags', () => {
      expect(iframeValidation('<iframe src="https://example.com"></iframe>')).toBe(true);
      expect(iframeValidation('<iframe>content</iframe>')).toBe(true);
    });

    it('should validate iframes with attributes', () => {
      expect(iframeValidation('<iframe width="560" height="315" src="https://example.com"></iframe>')).toBe(true);
      expect(iframeValidation('<iframe id="myframe" class="video" src="test.html"></iframe>')).toBe(true);
      expect(iframeValidation('<iframe allowfullscreen frameborder="0" src="video.html"></iframe>')).toBe(true);
    });

    it('should validate iframes with various attribute patterns', () => {
      const youtubeEmbed = '<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      expect(iframeValidation(youtubeEmbed)).toBe(true);
    });

    it('should invalidate non-iframe tags', () => {
      expect(iframeValidation('<div>content</div>')).toBe(false);
      expect(iframeValidation('<span>text</span>')).toBe(false);
      expect(iframeValidation('<video src="video.mp4"></video>')).toBe(false);
    });

    it('should invalidate malformed iframe tags', () => {
      expect(iframeValidation('<iframe')).toBe(false);
      expect(iframeValidation('iframe></iframe>')).toBe(false);
      expect(iframeValidation('')).toBe(false);
    });

    it('should validate iframes within other content', () => {
      const htmlWithIframe = '<div><iframe src="test.html"></iframe></div>';
      expect(iframeValidation(htmlWithIframe)).toBe(true);

      const textWithIframe = 'Some text <iframe src="video.html"/> more text';
      expect(iframeValidation(textWithIframe)).toBe(true);
    });
  });
});
