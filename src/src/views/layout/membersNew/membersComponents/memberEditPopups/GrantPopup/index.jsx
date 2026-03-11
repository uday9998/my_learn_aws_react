import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Text, { TYPES as txtTypes, SIZES as txtSizes } from 'components/elements/TextNew';
import './index.scss';
import Select from 'components/elements/SelectNew';
import ErrorMessageWrapper from 'components/elements/errorMessageWrapper';

const MemberEditGrantPopup = ({
   selectedGrantVariant, coursesOption, member, plans, selectedGrantAccess,
   errorMessages, changeGrantInputs
}) => {
   const [selectOptions, setSelectOptions] = useState([]);
   const [publishedPlans, setPublisedPlans] = useState([]);
   useEffect(() => {
      const filteredVariants = coursesOption.filter((variant) => {
         return member.courses ? !member.courses.filter((course) => course.id === variant.id)[0] : true;
      });
      const variants = filteredVariants.map((course) => {
         return { value: course.id, label: course.name };
      });
      setSelectOptions(variants);
   }, []);

   useEffect(() => {
      if (Boolean(plans) && Array.isArray(plans)) {
         const filteredPlans = plans
            .filter(plan => plan.status !== 0)
            .filter(plan => {
               if (!member.user_plans) return false;
               return !member.user_plans.some(item => item.id === plan.id);
            })
            .map(plan => ({ value: plan.id, label: plan.name }));

         setPublisedPlans(filteredPlans);
      }
   }, [plans]);

   return (
      <div className='grant__modal'>
         <Text
            inner='Grant Access'
            type={ txtTypes.medium }
            size={ txtSizes.xxlarge }
         />
         <Text
            inner='This offer will be sent to the member by email'
            size={ txtSizes.small }
            type={ txtTypes.regular148 }
            style={ { color: '#727978', marginBottom: '8px' } }
         />
         <ErrorMessageWrapper errorMessages={ errorMessages.grantVariant }>
            <Select
               options={ selectOptions }
               value={ selectedGrantVariant }
               onChange={ changeGrantInputs }
               name='grantVariant'
               type='select-medium'
               label='Grant Product Access'
               placeholder='Select a Product'
            />
         </ErrorMessageWrapper>
         <ErrorMessageWrapper errorMessages={ errorMessages.grantAccess }>
            <Select
               options={ publishedPlans }
               value={ selectedGrantAccess }
               onChange={ changeGrantInputs }
               name='grantAccess'
               type='select-medium'
               label='Grant Bundle Access'
               placeholder='Select a Bundle'
            />
         </ErrorMessageWrapper>
      </div>
   );
};

MemberEditGrantPopup.propTypes = {
   selectedGrantVariant: PropTypes.any,
   member: PropTypes.object,
   coursesOption: PropTypes.array,
   plans: PropTypes.array,
   selectedGrantAccess: PropTypes.number,
   errorMessages: PropTypes.object,
   changeGrantInputs: PropTypes.func,
};

export default MemberEditGrantPopup;
