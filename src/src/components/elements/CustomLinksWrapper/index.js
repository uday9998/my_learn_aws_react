const CustomLinksWrapper = ({ children, links }) => {
   const customLinks = [...links];
   customLinks.sort((a, b) => {
      if (a.order < b.order) return -1;
      return a.order > b.order ? 1 : 0;
   });
   const headerLinks = (customLinks && customLinks.filter(child => (child.position === 'right' || child.position === 'left')));
   const footerLinks = (customLinks && customLinks.filter(child => (child.position === 'f_right' || child.position === 'f_left')));
   return children({ headerLinks, footerLinks });
};

export default CustomLinksWrapper;
