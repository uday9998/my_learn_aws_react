const highlightSidebar = (componentSlug, toggleSidebar, menuVisible, isSubComponent, isClassSubComponent) => {
   if (!menuVisible) {
      toggleSidebar();
   }
   const CurrentSidebarComponent = document.querySelector(`#${ componentSlug }`);

   if (CurrentSidebarComponent.style.display !== 'none') return;

   const classSelector = !isSubComponent
      ? '.SectionComponent'
      : isSubComponent && !isClassSubComponent
         ? '.SubSectionComponent'
         : isClassSubComponent
            ? '.SubSubSectionComponent'
            : '';

   if (!classSelector) return;

   const sidebarElements = document.querySelectorAll(classSelector);

   if (sidebarElements) {
      sidebarElements.forEach((element) => {
         element.style.display = 'none';
         element.previousSibling.getElementsByClassName('component_arrow')[0]?.classList.remove('component_arrow__up');
      });
   }

   CurrentSidebarComponent.style.display = 'block';
   CurrentSidebarComponent.previousSibling.getElementsByClassName('component_arrow')[0]?.classList.add('component_arrow__up');

   CurrentSidebarComponent.style.backgroundColor = '#f3f0f0a3';
   CurrentSidebarComponent.scrollIntoView();

   setTimeout(() => {
      CurrentSidebarComponent.scrollIntoView();
   }, 800);
   setTimeout(() => {
      CurrentSidebarComponent.style.backgroundColor = '';
   }, 1000);
};

export default highlightSidebar;