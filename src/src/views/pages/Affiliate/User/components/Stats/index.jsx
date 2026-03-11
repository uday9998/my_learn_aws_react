import React, { useContext, useState } from 'react';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Button, { THEMES as themes } from 'components/elements/buttons/BaseButtonNew';
import IconNew from 'components/elements/iconsSize';
import { Popover } from '@material-ui/core';
import './index.scss';
import Persents from 'components/elements/Persents';
import { AffiliateUserContext } from 'containers/pages/admin/affiliate/User';

const AffiliateStats = () => {
   const { filterType, onChangeFilterType, user } = useContext(AffiliateUserContext);
   const filters = {
      today: 'Today',
      yesterday: 'Yesterday',
      this_week: 'This week',
      last_week: 'Last week',
      last30: 'Last 30 days',
      this_month: 'This month',
      last_month: 'Last month',
      this_year: 'This year',
      last_year: 'Last year',
   };
   const stats = {
      total: user.aff_user.your_income,
      affiliateTotal: user.aff_user.income,
      clicks: user.aff_user.clicks,
      sales: user.aff_user.sales,
      conversions: user.aff_user.conversions,
   };
   const [isOpenTriangle, setIsOpenTriangle] = useState(false);
   const [anchorEl, setAnchorEl] = useState(null);
   return (
      <div className='affiliate__stats affiliate__stats__user'>
         <div className='affiliate__stats__top'>
            <Text
               inner='Stats'
               type={ types.medium160 }
               size={ sizes.xlarge }
            />
            <Button
               theme={ themes.filter }
               text={ filters[filterType] }
               className={ isOpenTriangle ? 'affiliate__stats__top__active' : '' }
               iconName='AffiliateCalendarL'
               isIconLeft={ false }
               isIconRight={ true }
               onClick={ (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsOpenTriangle(true);
                  setAnchorEl(e.currentTarget);
               } }
            />
            <Popover
               open={ isOpenTriangle }
               anchorEl={ anchorEl }
               onClose={ () => setIsOpenTriangle(false) }
               className='custom-popover'
               elevation={ 24 }
               anchorOrigin={ {
                  vertical: 'bottom',
                  horizontal: 'right',
               } }
               transformOrigin={ {
                  vertical: 'top',
                  horizontal: 'right',
               } }
            >
               <div className='affiliate__stats__top__filter'>
                  {Object.keys(filters).map((e) => {
                     return (
                        <div
                           className='affiliate__stats__top__filter__item'
                           onClick={ () => {
                              onChangeFilterType(e);
                              setIsOpenTriangle(false);
                           } }
                           role='presentation'
                        >
                           {e === filterType && (
                              <IconNew name='AffiliateFilterCheckedM' />
                           )}
                           <Text
                              inner={ filters[e] }
                              type={ types.regularDefault }
                              size={ sizes.small }
                           />
                        </div>
                     );
                  })}
               </div>
            </Popover>
         </div>
         <div className='affiliate__stats__data'>
            <div className='affiliate__stats__data__revenue'>
               <div className='affiliate__stats__data__revenue__block' style={ { background: '#F8FAFA' } }>
                  <Text
                     inner={ `$${ stats.total }` }
                     type={ types.mediumSmall }
                     size={ sizes.xxlarge }
                     style={ { marginBottom: '8px' } }
                  />
                  <Text
                     inner='Your Total Revenue'
                     type={ types.regular148 }
                     size={ sizes.xsmall }
                     style={ { color: '#727978' } }
                  />
               </div>
               <div className='affiliate__stats__data__revenue__block'>
                  <Text
                     inner={ `$${ stats.affiliateTotal }` }
                     type={ types.mediumSmall }
                     size={ sizes.xxlarge }
                     style={ { marginBottom: '8px' } }
                  />
                  <Text
                     inner='Affiliate Total Revenue'
                     type={ types.regular148 }
                     size={ sizes.xsmall }
                     style={ { color: '#727978' } }
                  />
               </div>
            </div>
            <div className='affiliate__stats__data__line' />
            <div className='affiliate__stats__data__block'>
               <Text
                  inner={ `${ stats.clicks }` }
                  type={ types.mediumSmall }
                  size={ sizes.xxlarge }
                  style={ { marginBottom: '8px' } }
               />
               <Text
                  inner='Clicks'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { marginBottom: '4px' } }
               />
               <Text
                  inner={ filters[filterType] }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#727978', marginBottom: '8px' } }
               />
               <Persents
                  type='up'
                  persent={ 4.87 }
               />
            </div>
            <div className='affiliate__stats__data__line' />
            <div className='affiliate__stats__data__block'>
               <Text
                  inner={ `${ stats.sales }` }
                  type={ types.mediumSmall }
                  size={ sizes.xxlarge }
                  style={ { marginBottom: '8px' } }
               />
               <Text
                  inner='Sales'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { marginBottom: '4px' } }
               />
               <Text
                  inner={ filters[filterType] }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#727978', marginBottom: '8px' } }
               />
               <Persents
                  type='down'
                  persent={ 4.87 }
               />
            </div>
            {/* <div className='affiliate__stats__data__line' /> */}
            {/* <div className='affiliate__stats__data__block'>
               <Text
                  inner={ `${ stats.affiliates }` }
                  type={ types.mediumSmall }
                  size={ sizes.xxlarge }
                  style={ { marginBottom: '8px' } }
               />
               <Text
                  inner='Affiliates'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { marginBottom: '4px' } }
               />
               <Text
                  inner={ filters[filterType] }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#727978', marginBottom: '8px' } }
               />
               <Persents
                  type='up'
                  persent={ 4.87 }
               />
            </div> */}
            <div className='affiliate__stats__data__line' />
            <div className='affiliate__stats__data__block'>
               <Text
                  inner={ `${ stats.conversions } %` }
                  type={ types.mediumSmall }
                  size={ sizes.xxlarge }
                  style={ { marginBottom: '8px' } }
               />
               <Text
                  inner='Conversions'
                  type={ types.regularDefault }
                  size={ sizes.small }
                  style={ { marginBottom: '4px' } }
               />
               <Text
                  inner={ filters[filterType] }
                  type={ types.regular148 }
                  size={ sizes.xsmall }
                  style={ { color: '#727978', marginBottom: '8px' } }
               />
               <Persents
                  type='up'
                  persent={ 4.87 }
               />
            </div>
         </div>
      </div>
   );
};

AffiliateStats.propTypes = {

};

export default AffiliateStats;
