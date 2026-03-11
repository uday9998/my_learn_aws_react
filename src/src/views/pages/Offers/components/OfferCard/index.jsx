import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import { videoImg } from 'utils/videoImg';
import PreviewVideo from './previewVideo';
import LiquidRenderer from '../../liquidRenderer';

const cache = {};
const probeUrl = async (url) => {
  if (url in cache) return cache[url];
  try {
    const res = await fetch(url, { method: 'HEAD' });
    cache[url] = res.ok;
    return res.ok;
  } catch {
    cache[url] = false;
    return false;
  }
};
const buildSegmentUrl = (src, seconds = 5) => `${src}#t=0,${seconds}`;

// Helper function to truncate name if longer than 24 characters
const truncateName = (name) => {
  if (!name || name.length <= 24) return name;
  return name.substring(0, 24) + '...';
};

const OfferCard = ({
  image,
  name,
  offer,
  usdCurrency,
  isEditor,
  onExplore,
  handleBuyOffer,
  schoolRoomThemeName,
  template,
  closeEditor,
  user,
  handleFavorite,
  checkIsFavorite,
  joined,
  type,
  category,
  swiping,
  setSingleCategory,
  isPlaylistFrontPage,
  setSinglePlaylist,
  exploreCourse,
  membershipOffer,
}) => {
  const history = useHistory();
  const [offerType, setOfferType] = useState({});
  const [pricing, setPricing] = useState('');
  const [processedVideos, setProcessedVideos] = useState({});
  const [hovered, setHovered] = useState(false);
  const generatePreview = (video) => {
    if (!video?.src) return null;
    if (video.is_system_preview_generated && video.poster) return null;
    const parts = video.src.split('/');
    const base = video.src.substring(0, video.src.lastIndexOf('/'));
    const name = parts.pop().split('.')[0];
    return `${base}/previews/${name}_preview.mp4`;
  };
  const calculateDuration = (video) =>
    new Promise((resolve) => {
      if (!video?.src) return resolve(null);
      const el = document.createElement('video');
      el.src = video.src;
      el.preload = 'metadata';
      const cleanup = () => el.remove();
      el.onloadedmetadata = () => {
        const d = Math.round(el.duration);
        video.duration = d;
        cleanup();
        resolve(d);
      };
      el.onerror = () => {
        cleanup();
        resolve(null);
      };
      setTimeout(() => {
        cleanup();
        resolve(null);
      }, 8000);
    });
  const currencySymbols = {
    AED: 'د.إ',
    AFN: '؋',
    ALL: 'L',
    AMD: '֏',
    ANG: 'ƒ',
    AOA: 'Kz',
    ARS: '$',
    AUD: 'A$',
    AWG: 'ƒ',
    AZN: '₼',
    BAM: 'KM',
    BBD: 'Bds$',
    BDT: '৳',
    BGN: 'лв',
    BHD: '.د.ب',
    BIF: 'FBu',
    BMD: 'BD$',
    BND: 'B$',
    BOB: 'Bs.',
    BRL: 'R$',
    BSD: 'B$',
    BTN: 'Nu.',
    BWP: 'P',
    BYN: 'Br',
    BZD: 'BZ$',
    CAD: 'C$',
    CDF: 'FC',
    CHF: 'Fr.',
    CLP: '$',
    CNY: '¥',
    COP: '$',
    CRC: '₡',
    CUC: 'CUC$',
    CUP: '$MN',
    CVE: '$',
    CZK: 'Kč',
    DJF: 'Fdj',
    DKK: 'kr',
    DOP: 'RD$',
    DZD: 'دج',
    EGP: 'E£',
    ERN: 'Nfk',
    ETB: 'Br',
    EUR: '€',
    FJD: 'FJ$',
    FKP: '£',
    GBP: '£',
    GEL: '₾',
    GHS: 'GH₵',
    GIP: '£',
    GMD: 'D',
    GNF: 'FG',
    GTQ: 'Q',
    GYD: 'G$',
    HKD: 'HK$',
    HNL: 'L',
    HRK: 'kn',
    HTG: 'G',
    HUF: 'Ft',
    IDR: 'Rp',
    ILS: '₪',
    INR: '₹',
    IQD: 'ع.د',
    IRR: '﷼',
    ISK: 'kr',
    JMD: 'J$',
    JOD: 'JD',
    JPY: '¥',
    KES: 'Ksh',
    KGS: 'сом',
    KHR: '៛',
    KMF: 'CF',
    KPW: '₩',
    KRW: '₩',
    KWD: 'KD',
    KYD: 'CI$',
    KZT: '₸',
    LAK: '₭',
    LBP: 'ل.ل',
    LKR: 'Rs',
    LRD: 'L$',
    LSL: 'M',
    LYD: 'LD',
    MAD: 'DH',
    MDL: 'L',
    MGA: 'Ar',
    MKD: 'ден',
    MMK: 'K',
    MNT: '₮',
    MOP: 'MOP$',
    MRU: 'UM',
    MUR: '₨',
    MVR: 'Rf',
    MWK: 'MK',
    MXN: '$',
    MYR: 'RM',
    MZN: 'MT',
    NAD: 'N$',
    NGN: '₦',
    NIO: 'C$',
    NOK: 'kr',
    NPR: '₨',
    NZD: 'NZ$',
    OMR: 'ر.ع.',
    PAB: 'B/.',
    PEN: 'S/.',
    PGK: 'K',
    PHP: '₱',
    PKR: '₨',
    PLN: 'zł',
    PYG: '₲',
    QAR: 'QR',
    RON: 'lei',
    RSD: 'din.',
    RUB: '₽',
    RWF: 'FRw',
    SAR: 'SR',
    SBD: 'SI$',
    SCR: 'SR',
    SDG: 'ج.س.',
    SEK: 'kr',
    SGD: 'S$',
    SHP: '£',
    SLL: 'Le',
    SOS: 'Sh.So.',
    SRD: '$',
    SSP: 'SS£',
    STN: 'Db',
    SYP: 'LS',
    SZL: 'E',
    THB: '฿',
    TJS: 'SM',
    TMT: 'm',
    TND: 'DT',
    TOP: 'T$',
    TRY: '₺',
    TTD: 'TT$',
    TWD: 'NT$',
    TZS: 'TSh',
    UAH: '₴',
    UGX: 'USh',
    USD: '$',
    UYU: '$U',
    UZS: 'soʻm',
    VES: 'Bs.S',
    VND: '₫',
    VUV: 'VT',
    WST: 'WS$',
    XAF: 'FCFA',
    XCD: 'EC$',
    XOF: 'CFA',
    XPF: '₣',
    YER: '﷼',
    ZAR: 'R',
    ZMW: 'ZK',
    ZWL: 'Z$',
  };
  useEffect(() => {
    const processVideos = async () => {
      const updated = {};
      const work = [];
      const handle = async (v) => {
        if (!v || processedVideos[v.id]) return;
        if (!v.duration) {
          const d = await calculateDuration(v);
          if (d) updated[v.id] = { ...(updated[v.id] || v), duration: d };
        }
        let preview = generatePreview(v);
        if (preview && !(await probeUrl(preview))) preview = null;
        if (!preview) preview = buildSegmentUrl(v.src);
        updated[v.id] = { ...(updated[v.id] || v), preview_url: preview };
      };
      const digBlocks = (blocks) => blocks.forEach((b) => b.videos?.forEach((v) => work.push(handle(v))));
      offer.courses?.forEach((c) => c.lessons?.forEach((l) => digBlocks(l.blocks || [])));
      offer.lessons?.forEach((l) => digBlocks(l.blocks || []));
      if (offer.blocks) {
        Array.isArray(offer.blocks)
          ? digBlocks(offer.blocks)
          : Object.values(offer.blocks).forEach((b) => digBlocks([b]));
      }
      await Promise.all(work);
      if (Object.keys(updated).length) setProcessedVideos((p) => ({ ...p, ...updated }));
    };
    processVideos();
  }, [offer]);
  useEffect(() => {
    if (offer.pricings?.length > 0) {
      const p = offer.pricings[0];
      if (p.price === undefined || p.price === null || p.price === 0 || p.pricing_type === 0) {
        setPricing({ ...p, price: 'Free', currencySymbol: '', rawPrice: 0, formattedPrice: 'Free' });
      } else {
        const s = currencySymbols[p.currency] || p.currency + ' ';
        const fv = p.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        setPricing({ ...p, price: s + fv, currencySymbol: s, rawPrice: p.price, formattedPrice: s + fv });
      }
    }
  }, [offer]);
  const offerHasFreePricing = offer.pricings && offer.pricings.length === 1 && offer.pricings.some((q) => q.pricing_type === 0);
  const getPrimaryButtonText = () => (offerHasFreePricing ? 'Get Product' : 'Buy Product');
  const getVideoTime = (course) => {
    const v = course.lessons?.[0]?.blocks?.[0]?.videos?.[0];
    const sec = v ? processedVideos[v.id]?.duration || v.duration : 0;
    if (!sec) return '00:00:00';
    return moment.utc(sec * 1000).format('H[:]mm[:]ss');
  };
  const getCourseIcon = (course) => {
    if (course.type === '1') {
      if (course.lessons.length > 1) setOfferType({ type: 'more__lessons', lessons: course.lessons, url: course.url });
      else setOfferType({ type: 'lessons', duration: getVideoTime(course), url: course.url });
    } else if (course.type === '0') setOfferType({ type: 'online course', url: course.url });
    else if (course.type === '2') setOfferType({ type: 'community', url: course.url });
  };
  useEffect(() => {
    if ((offer.courses?.length === 1) || offer.type) {
      if (offer.type) getCourseIcon(offer);
      else offer.courses.forEach(getCourseIcon);
    }
  }, [offer, processedVideos]);
  const handleClickSecondaryButton = () => {
    if (type === 'membership') {
      const dc = membershipOffer?.default_course ? membershipOffer.default_course[0] : null;
      const cid = dc?.id || category.course_id;
      const en = dc?.bridge_page?.enableBridge || category.bridge_page?.enableBridge || category.default_course?.bridge_page?.enableBridge;
      if (offer.is_playlist) {
        const uo = { ...offer, blocks: Object.values(offer.blocks) };
        setSingleCategory(uo);
        if (setSinglePlaylist) setSinglePlaylist(uo);
        history.push(`/portal/membership/playlists/${offer.link}`);
      } else if (isPlaylistFrontPage) {
        if (en && !category.joined) exploreCourse({ id: cid, type: '1' }, category.link, offer.lesson_id, isPlaylistFrontPage);
        else if (offer.lesson_id) history.push(`/programs/${offer.course_url}/playlists/${isPlaylistFrontPage}?video=${offer.lesson_id}`);
        else history.push(`/programs/${offer.course_url}/playlists/${isPlaylistFrontPage}`);
      } else if (en && !offer.joined) exploreCourse({ ...membershipOffer, id: cid, type: '1' }, category.link, offer.id);
      else history.push(`/programs/${offer.course_url}/${category.link}?video=${offer.id}`);
      return;
    }
    if (offer.publish_without_integrations || (offer.type && !offer.pricings)) return;
    if (offer.type) {
      if (offer.type === '2') {
        if (offer.bridge_page?.enableBridge !== false && !offer.joined) exploreCourse(offer);
        else handleBuyOffer({ id: offer.pricings?.[0]?.plan_id, pricings: offer.pricings }, offer);
      } else if (offer.bridge_page?.enableBridge && !offer.joined) exploreCourse(offer);
      else history.push(`/programs/${offer.url}`);
    } else if (Object.keys(offerType).length) {
      if (offerType.type === 'community') handleBuyOffer(offer);
      else {
        const win = window.open(`/programs/${offerType.url}`);
        win.plan = offer;
      }
    } else onExplore(offer.id);
  };
  const handleVideoTrailer = (lesson) => {
    if (lesson?.id && processedVideos[lesson.id]?.preview_url) return processedVideos[lesson.id].preview_url;
    let videoUrl = generatePreview(lesson);
    if (!videoUrl) videoUrl = buildSegmentUrl(lesson?.src || '');
    return videoUrl;
  };
  const handleVideoImg = (lesson) => {
    if (type !== 'membership') return image;
    if (offer.is_playlist) {
      if (offer.file?.src) return offer.file?.src;
      return 'https://d1h8t4w16bjw27.cloudfront.net/landing/offer_default.png';
    }
    return videoImg(lesson);
  };
  const hasTrailer = (obj) => {
    if (!obj) return null;
    if (obj.is_playlist) {
      if (type === 'membership' && obj.trailer?.src) return obj.trailer.src;
      if (processedVideos[obj.id]?.preview_url) return processedVideos[obj.id].preview_url;
    } else {
      if (processedVideos[obj.id]?.preview_url) return processedVideos[obj.id].preview_url;
      if (obj.blocks?.[0]?.videos?.[0]) {
        const v = obj.blocks[0].videos[0];
        if (processedVideos[v.id]?.preview_url) return processedVideos[v.id].preview_url;
      }
    }
    return buildSegmentUrl(obj.src || '');
  };
  const handleMouseOver = () => setHovered(true);
  const handleMouseOut = () => setHovered(false);
  const checkPlaylistVideos = () => {
    let info = '';
    if (offer.is_playlist === 1 && offer.blocks) {
      info = { type: 'more__lessons', count: Array.isArray(offer.blocks) ? offer.blocks.length : Object.values(offer.blocks).length };
    } else if (offer.blocks) {
      let duration = false;
      if (offer.blocks.length === 1 && offer.blocks[0]?.videos?.length) {
        const v = offer.blocks[0].videos[0];
        if (processedVideos[v.id]?.duration) duration = moment.utc(processedVideos[v.id].duration * 1000).format('HH:mm:ss');
        else if (v?.duration) duration = moment.utc(v.duration * 1000).format('HH:mm:ss');
        else duration = '00:00:00';
      }
      info = { duration };
    }
    return info;
  };
  return (
    <div className="cardWithVideo" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <LiquidRenderer
        template={template}
        data={{
          schoolRoomThemeName: `${schoolRoomThemeName} ${!closeEditor && schoolRoomThemeName !== 'template3' ? 'active_editor' : ''}`,
          image: handleVideoImg(offer),
          name: truncateName(name),
          offerHasFreePricing,
          priceLeftText: offerHasFreePricing ? 'Price:' : 'Price starts from:',
          price: offerHasFreePricing ? 'Free' : pricing?.formattedPrice || '',
          showPrimaryButton: !offer.publish_without_integrations && (!offer.joined || isEditor),
          primaryButtonText: getPrimaryButtonText(),
          user,
          checkIsFavorite,
          description: offer.description || '',
          lessonsCount: offer.lessons?.length,
          secondaryButtonsIconColor: 'var(--offersSliderColor)',
          offerType: checkPlaylistVideos(),
          joined: joined || offer.is_free_lesson || (category && category.is_free_lesson),
          templateName: schoolRoomThemeName,
          pricing,
        }}
        actions={{
          onClickPrimaryButton: isEditor || swiping ? () => {} : () => handleBuyOffer(),
          onClickSecondaryButton: isEditor || swiping ? () => {} : () => handleClickSecondaryButton(),
          onClickFavorite: isEditor || swiping ? () => {} : () => handleFavorite(offer.id),
        }}
      />
      {hovered && hasTrailer(offer) && (
        <div
          className="cardWithVideoTrailer"
          role="presentation"
          onClick={isEditor || swiping ? undefined : () => handleClickSecondaryButton()}
          style={{ background: 'rgba(0,0,0,.5)' }}
        >
          <video
            src={hasTrailer(offer)}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
    </div>
  );
};

OfferCard.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  offer: PropTypes.object,
  usdCurrency: PropTypes.object,
  isEditor: PropTypes.bool,
  onExplore: PropTypes.func,
  handleBuyOffer: PropTypes.func,
  schoolRoomThemeName: PropTypes.string,
  template: PropTypes.string,
  closeEditor: PropTypes.bool,
  user: PropTypes.object,
  handleFavorite: PropTypes.func,
  checkIsFavorite: PropTypes.func,
  joined: PropTypes.bool,
  type: PropTypes.string,
  swiping: PropTypes.bool,
  category: PropTypes.object,
  setSingleCategory: PropTypes.func,
  isPlaylistFrontPage: PropTypes.bool,
  setSinglePlaylist: PropTypes.func,
  exploreCourse: PropTypes.func,
  membershipOffer: PropTypes.object,
};

export default OfferCard;